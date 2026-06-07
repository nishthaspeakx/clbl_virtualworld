// ---------------------------------------------------------------------------
// Sia voice engine
// ---------------------------------------------------------------------------
// speakSia(text, emotion, { onStart, onEnd })
//   1. Plays a pre-recorded local audio file if one is registered for the line.
//   2. Otherwise falls back to the browser's speechSynthesis (warm Indian
//      English female voice when available).
// Returns a controller: { cancel }.
// ---------------------------------------------------------------------------

// Register pre-recorded clips here, keyed by the EXACT dialogue text, e.g.
//   'Hello, welcome to Taj Mahal.': '/audio/sia/hello.mp3'
// Drop the mp3s in public/audio/sia/. Anything not listed uses speechSynthesis.
export const SIA_AUDIO = {}

const SIA_VOICE = { rate: 0.9, pitch: 1.1, volume: 1, lang: 'en-IN' }

// Rough speaking duration estimate (ms) for the silent / no-TTS fallback.
const estimate = (text) => Math.min(6500, 700 + text.length * 60)

// Prefer a warm Indian-English female voice, then any English female,
// then any English voice.
const FEMALE_HINT =
  /(female|woman|zira|heera|swara|priya|raveena|aditi|neerja|isha|kalpana|veena|lekha|samantha|google uk english female)/i

export function pickSiaVoice() {
  const synth = typeof window !== 'undefined' && window.speechSynthesis
  if (!synth) return null
  const voices = synth.getVoices() || []
  if (!voices.length) return null
  return (
    // 1. Warm Indian-English female (ideal)
    voices.find((v) => /en[-_]IN/i.test(v.lang) && FEMALE_HINT.test(v.name)) ||
    // 2. Any English female (closer to intent than a male voice)
    voices.find((v) => /^en/i.test(v.lang) && FEMALE_HINT.test(v.name)) ||
    // 3. Any Indian-English voice (accent over gender)
    voices.find((v) => /en[-_]IN/i.test(v.lang)) ||
    // 4. Any English voice, then anything
    voices.find((v) => /^en/i.test(v.lang)) ||
    voices[0]
  )
}

export function speakSia(text, emotion = 'happy', { onStart, onEnd } = {}) {
  let finished = false
  let audio = null
  let fallbackTimer = null

  const finish = () => {
    if (finished) return
    finished = true
    if (fallbackTimer) clearTimeout(fallbackTimer)
    onEnd && onEnd()
  }
  const start = () => onStart && onStart()

  const useTTS = () => {
    const synth = typeof window !== 'undefined' && window.speechSynthesis
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
      // No speech support at all — animate for an estimated duration.
      start()
      fallbackTimer = setTimeout(finish, estimate(text))
      return
    }
    try {
      synth.cancel()
    } catch {}
    const u = new SpeechSynthesisUtterance(text)
    const v = pickSiaVoice()
    if (v) u.voice = v
    u.lang = (v && v.lang) || SIA_VOICE.lang
    u.rate = SIA_VOICE.rate
    u.pitch = SIA_VOICE.pitch
    u.volume = SIA_VOICE.volume
    u.onstart = start
    u.onend = finish
    u.onerror = finish
    // Safety net: some browsers occasionally drop onend for long lines.
    fallbackTimer = setTimeout(finish, estimate(text) + 1500)
    synth.speak(u)
  }

  const src = SIA_AUDIO[text]
  if (src) {
    audio = new Audio(src)
    audio.volume = SIA_VOICE.volume
    audio.onplay = start
    audio.onended = finish
    audio.onerror = useTTS
    audio.play().catch(useTTS)
  } else {
    useTTS()
  }

  const cancel = () => {
    if (audio) {
      try {
        audio.pause()
      } catch {}
    }
    try {
      window.speechSynthesis && window.speechSynthesis.cancel()
    } catch {}
    finish()
  }

  return { cancel }
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
