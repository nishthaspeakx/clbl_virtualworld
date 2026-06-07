// ---------------------------------------------------------------------------
// Guide voice engine (male). Mirrors src/sia.js but with a male voice + pitch.
//   speakGuide(text, emotion, { onStart, onEnd }) -> { cancel }
//     1. Plays a pre-recorded local clip if registered for the line.
//     2. Otherwise falls back to browser speechSynthesis (male English voice,
//        preferring Indian English).
// ---------------------------------------------------------------------------

// Register pre-recorded clips here, keyed by EXACT dialogue text, e.g.
//   'Welcome to Taj Mahal.': '/audio/guide/welcome.mp3'
// Drop mp3s in public/audio/guide/. Anything not listed uses speechSynthesis.
export const GUIDE_AUDIO = {}

const GUIDE_VOICE = { rate: 0.9, pitch: 0.85, volume: 1, lang: 'en-IN' }

const estimate = (text) => Math.min(7000, 700 + text.length * 60)

// Preferred named voices (Indian / known clear male voices first).
const PREFERRED = /(india|indian|ravi|rishi|prabhat|google uk english male|microsoft ravi|microsoft mark)/i
// General male-voice name hints.
const MALE_HINT =
  /(male|ravi|rishi|prabhat|hemant|daniel|alex|fred|aaron|arthur|oliver|gordon|reed|rocko|junior|google uk english male|microsoft (mark|david|george|guy))/i

export function pickGuideVoice() {
  const synth = typeof window !== 'undefined' && window.speechSynthesis
  if (!synth) return null
  const voices = synth.getVoices() || []
  if (!voices.length) return null
  return (
    // 1. Preferred Indian / named male voices
    voices.find((v) => PREFERRED.test(v.name)) ||
    // 2. Indian-English male
    voices.find((v) => /en[-_]IN/i.test(v.lang) && MALE_HINT.test(v.name)) ||
    // 3. Any Indian-English voice (accent)
    voices.find((v) => /en[-_]IN/i.test(v.lang)) ||
    // 4. Any English male
    voices.find((v) => /^en/i.test(v.lang) && MALE_HINT.test(v.name)) ||
    // 5. Any English voice, then anything
    voices.find((v) => /^en/i.test(v.lang)) ||
    voices[0]
  )
}

export function speakGuide(text, emotion = 'welcoming', { onStart, onEnd } = {}) {
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
      start()
      fallbackTimer = setTimeout(finish, estimate(text))
      return
    }
    try {
      synth.cancel()
    } catch {}
    const u = new SpeechSynthesisUtterance(text)
    const v = pickGuideVoice()
    if (v) u.voice = v
    u.lang = (v && v.lang) || GUIDE_VOICE.lang
    u.rate = GUIDE_VOICE.rate
    u.pitch = GUIDE_VOICE.pitch
    u.volume = GUIDE_VOICE.volume
    u.onstart = start
    u.onend = finish
    u.onerror = finish
    fallbackTimer = setTimeout(finish, estimate(text) + 1500)
    synth.speak(u)
  }

  const src = GUIDE_AUDIO[text]
  if (src) {
    audio = new Audio(src)
    audio.volume = GUIDE_VOICE.volume
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
