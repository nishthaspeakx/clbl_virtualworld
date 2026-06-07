import { useCallback, useEffect, useRef, useState } from 'react'
import { speakSia } from './sia'

// Manages Sia's speech + animation state.
//   speak(text, emotion) -> starts voice, flips isSpeaking on/off, sets emotion
//   cancel()             -> stops any current speech
// Returns { speak, cancel, isSpeaking, emotion }.
export default function useSiaSpeech(initialEmotion = 'happy') {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [emotion, setEmotion] = useState(initialEmotion)
  const ctrl = useRef(null)
  const active = useRef({ text: null, on: false })

  const speak = useCallback((text, emo = 'happy') => {
    // Ignore a duplicate rapid call for the same line (React StrictMode
    // double-invokes effects in dev), which would cancel + restart the voice.
    if (active.current.on && active.current.text === text) return
    setEmotion(emo)
    if (ctrl.current) ctrl.current.cancel()
    active.current = { text, on: true }
    setIsSpeaking(true)
    ctrl.current = speakSia(text, emo, {
      onEnd: () => {
        active.current.on = false
        setIsSpeaking(false)
      },
    })
  }, [])

  const cancel = useCallback(() => {
    if (ctrl.current) ctrl.current.cancel()
    setIsSpeaking(false)
  }, [])

  // Stop speaking if the component using this hook unmounts.
  useEffect(() => () => cancel(), [cancel])

  return { speak, cancel, isSpeaking, emotion }
}
