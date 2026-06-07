import { useCallback, useEffect, useRef, useState } from 'react'
import { speakGuide } from './guide'

// Manages the Guide's speech + animation state.
//   speakGuide(text, emotion) -> Promise that resolves when the voice ends
//   stopGuideSpeech()         -> cancels current speech
// Returns { speak, stop, isGuideSpeaking, currentGuideEmotion }.
export default function useGuideSpeech(initialEmotion = 'welcoming') {
  const [isGuideSpeaking, setSpeaking] = useState(false)
  const [currentGuideEmotion, setEmotion] = useState(initialEmotion)
  const ctrl = useRef(null)

  const speak = useCallback((text, emotion = 'welcoming') => {
    setEmotion(emotion)
    if (ctrl.current) ctrl.current.cancel()
    setSpeaking(true)
    return new Promise((resolve) => {
      ctrl.current = speakGuide(text, emotion, {
        onEnd: () => {
          setSpeaking(false)
          resolve()
        },
      })
    })
  }, [])

  const stop = useCallback(() => {
    if (ctrl.current) ctrl.current.cancel()
    setSpeaking(false)
  }, [])

  // Stop speaking if the component using this hook unmounts.
  useEffect(() => () => stop(), [stop])

  return { speak, stop, isGuideSpeaking, currentGuideEmotion }
}
