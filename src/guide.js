// ---------------------------------------------------------------------------
// Guide voice engine (male). Mirrors src/sia.js but with a male voice + pitch.
//   speakGuide(text, emotion, { onStart, onEnd }) -> { cancel }
//     1. Plays a pre-recorded local clip if registered for the line.
//     2. Otherwise falls back to browser speechSynthesis (male English voice,
//        preferring Indian English).
// ---------------------------------------------------------------------------

import { speakWithFallback } from './tts'

// Register pre-recorded clips here, keyed by EXACT dialogue text, e.g.
//   'Welcome to Taj Mahal.': '/audio/guide/welcome.mp3'
// Drop mp3s in public/audio/guide/. Anything not listed uses speechSynthesis.
export const GUIDE_AUDIO = {}

const GUIDE_VOICE = { rate: 0.9, pitch: 0.85, volume: 1, lang: 'en-IN' }

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
  return speakWithFallback({
    text,
    audioSrc: GUIDE_AUDIO[text],
    voiceCfg: {
      pickVoice: pickGuideVoice,
      rate: GUIDE_VOICE.rate,
      pitch: GUIDE_VOICE.pitch,
      volume: GUIDE_VOICE.volume,
      lang: GUIDE_VOICE.lang,
    },
    onStart,
    onEnd,
  })
}
