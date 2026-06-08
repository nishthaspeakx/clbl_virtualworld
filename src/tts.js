// ---------------------------------------------------------------------------
// Robust browser speechSynthesis core (shared by Sia + Guide).
//
// Works around well-known browser bugs that caused voices to cut out / go
// silent after a few lines:
//   1. The SpeechSynthesisUtterance is kept referenced at module scope so the
//      browser can't garbage-collect it mid-sentence (the #1 cause of onend
//      never firing and audio stopping halfway).
//   2. resume() is called before speaking in case the engine got stuck in a
//      "paused" state after a previous cancel()/navigation (why a later
//      character — the guide — could end up with no voice at all).
//   3. A keep-alive heartbeat pings resume() so long utterances aren't paused
//      at the ~15s mark.
//   4. cancel() then a short delay before speak() avoids the cancel→speak race.
//   5. A generous safety timer guarantees onEnd fires even if the engine drops
//      the event, so the flow never hard-locks.
// ---------------------------------------------------------------------------

let currentUtterance = null // GC guard — MUST stay referenced while speaking
let keepAlive = null
let primed = false

const synth = () =>
  typeof window !== 'undefined' ? window.speechSynthesis : null

// Chrome (and Safari) only allow speechSynthesis after a real user gesture.
// Our lines are spoken from React effects (not inside the click handler), so
// the browser silently drops them until the engine is "unlocked". Speaking a
// silent utterance from within the FIRST user gesture unlocks it for the whole
// session. Idempotent.
export function primeSpeech() {
  if (primed) return
  const s = synth()
  if (!s || typeof SpeechSynthesisUtterance === 'undefined') return
  try {
    s.cancel()
    s.resume()
    // Non-empty text — whitespace-only utterances are dropped by Chrome and
    // never unlock the engine. volume 0 keeps it silent.
    const u = new SpeechSynthesisUtterance('SpeakX')
    u.volume = 0
    u.rate = 1.5
    s.speak(u)
    primed = true
  } catch {}
}

// Auto-prime on the very first interaction anywhere in the app.
if (typeof window !== 'undefined') {
  window.addEventListener('pointerdown', primeSpeech, { once: true })
  window.addEventListener('touchstart', primeSpeech, { once: true })
  window.addEventListener('keydown', primeSpeech, { once: true })
}

function stopKeepAlive() {
  if (keepAlive) {
    clearInterval(keepAlive)
    keepAlive = null
  }
}

export function cancelSpeech() {
  stopKeepAlive()
  currentUtterance = null
  const s = synth()
  if (s) {
    try {
      s.cancel()
    } catch {}
  }
}

// Speak a line via TTS. cfg: { pickVoice, rate, pitch, volume, lang,
// onStart, onEnd }. Returns { cancel }.
export function ttsSpeak(text, cfg = {}) {
  const { pickVoice, rate = 1, pitch = 1, volume = 1, lang = 'en-US', onStart, onEnd } = cfg
  const s = synth()
  let finished = false
  let safety = null

  const finish = () => {
    if (finished) return
    finished = true
    if (safety) clearTimeout(safety)
    stopKeepAlive()
    if (currentUtterance && currentUtterance.__text === text) currentUtterance = null
    onEnd && onEnd()
  }

  // No speech support → animate for an estimated duration.
  if (!s || typeof SpeechSynthesisUtterance === 'undefined') {
    onStart && onStart()
    const t = setTimeout(finish, Math.min(6000, 700 + text.length * 60))
    return { cancel: () => { clearTimeout(t); finish() } }
  }

  try {
    s.cancel()
  } catch {}

  const u = new SpeechSynthesisUtterance(text)
  u.__text = text
  u.rate = rate
  u.pitch = pitch
  u.volume = volume
  u.lang = lang
  u.onstart = () => onStart && onStart()
  u.onend = finish
  u.onerror = finish
  currentUtterance = u // keep referenced (anti-GC)

  const applyVoiceAndSpeak = () => {
    if (finished) return
    try {
      const v = pickVoice && pickVoice()
      if (v) {
        u.voice = v
        u.lang = v.lang || lang
      }
      s.resume() // un-stick a paused engine
      s.speak(u)
      stopKeepAlive()
      keepAlive = setInterval(() => {
        try {
          if (s.speaking) s.resume()
          else stopKeepAlive()
        } catch {}
      }, 10000)
    } catch {
      finish()
    }
  }

  // Voices can load async (Chrome). Wait briefly if the list is empty.
  const voices = s.getVoices() || []
  if (voices.length === 0) {
    let done = false
    const go = () => {
      if (done) return
      done = true
      applyVoiceAndSpeak()
    }
    try {
      s.addEventListener('voiceschanged', go, { once: true })
    } catch {}
    setTimeout(go, 250)
  } else {
    // small gap after cancel() avoids the cancel→speak race
    setTimeout(applyVoiceAndSpeak, 50)
  }

  // Backstop: guarantee completion even if the engine drops onend.
  safety = setTimeout(finish, Math.min(14000, 1800 + text.length * 95))

  return {
    cancel: () => {
      if (safety) clearTimeout(safety)
      stopKeepAlive()
      try {
        s.cancel()
      } catch {}
      if (currentUtterance === u) currentUtterance = null
      finish()
    },
  }
}

// Audio-file-first, TTS-fallback. Returns { cancel }.
export function speakWithFallback({ text, audioSrc, voiceCfg, onStart, onEnd }) {
  const cbs = { ...voiceCfg, onStart, onEnd }
  if (!audioSrc) return ttsSpeak(text, cbs)

  let audio = null
  let switched = false
  let ttsCtrl = null
  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    onEnd && onEnd()
  }

  audio = new Audio(audioSrc)
  audio.volume = voiceCfg.volume ?? 1
  audio.onplay = () => onStart && onStart()
  audio.onended = finish
  audio.onerror = () => {
    if (switched) return
    switched = true
    // hand off to TTS (don't double-fire onEnd)
    ttsCtrl = ttsSpeak(text, { ...voiceCfg, onStart, onEnd })
  }
  audio.play().catch(() => audio.onerror())

  return {
    cancel: () => {
      if (audio) {
        try {
          audio.pause()
        } catch {}
      }
      if (ttsCtrl) ttsCtrl.cancel()
      finish()
    },
  }
}

// Warm up the voice list early (Chrome loads voices asynchronously).
if (typeof window !== 'undefined' && window.speechSynthesis) {
  try {
    window.speechSynthesis.getVoices()
    window.speechSynthesis.onvoiceschanged = () => {
      try {
        window.speechSynthesis.getVoices()
      } catch {}
    }
  } catch {}
}
