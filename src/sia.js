// ---------------------------------------------------------------------------
// Sia voice engine
// ---------------------------------------------------------------------------
// speakSia(text, emotion, { onStart, onEnd })
//   1. Plays a pre-recorded local audio file if one is registered for the line.
//   2. Otherwise falls back to the browser's speechSynthesis (warm Indian
//      English female voice when available).
// Returns a controller: { cancel }.
// ---------------------------------------------------------------------------

import { speakWithFallback } from './tts'

// Register pre-recorded clips here, keyed by the EXACT dialogue text, e.g.
//   'Hello, welcome to Taj Mahal.': '/audio/sia/hello.mp3'
// Drop the mp3s in public/audio/sia/. Anything not listed uses speechSynthesis.
export const SIA_AUDIO = {}

const SIA_VOICE = { rate: 0.9, pitch: 1.1, volume: 1, lang: 'en-IN' }

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
  return speakWithFallback({
    text,
    audioSrc: SIA_AUDIO[text],
    voiceCfg: {
      pickVoice: pickSiaVoice,
      rate: SIA_VOICE.rate,
      pitch: SIA_VOICE.pitch,
      volume: SIA_VOICE.volume,
      lang: SIA_VOICE.lang,
    },
    onStart,
    onEnd,
  })
}
