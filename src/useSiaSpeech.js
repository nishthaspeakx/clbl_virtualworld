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

  const speak = useCallback((text, emo = 'happy') => {
    setEmotion(emo)
    if (ctrl.current) ctrl.current.cancel()
    setIsSpeaking(true)
    ctrl.current = speakSia(text, emo, {
      onEnd: () => setIsSpeaking(false),
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
