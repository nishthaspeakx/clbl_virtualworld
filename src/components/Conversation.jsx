import { useEffect, useState } from 'react'
import DialogueBox from './DialogueBox'
import UserBubble from './UserBubble'
import SpeakButton from './SpeakButton'
import { playClickSound } from '../lib'

// A small step-driven conversation engine shared by the Sia and Guide
// screens. `script` is an array of steps:
//   { kind: 'say',   speaker, color, text }   -> character line (tap to continue)
//   { kind: 'speak', phrase }                 -> mic button -> user voice bubble
//   { kind: 'node',  render }                 -> custom UI (e.g. MCQ); calls done()
// onFinish() fires after the last step is completed.
export default function Conversation({ script, onFinish, color = 'sia', sia }) {
  const [index, setIndex] = useState(0)
  const [log, setLog] = useState([]) // committed bubbles to keep on screen

  const step = script[index]

  // When a Sia line becomes active, make her speak it (voice + animation).
  // Gated so the user can't skip ahead until she finishes.
  useEffect(() => {
    const s = script[index]
    if (sia && s && s.kind === 'say') {
      sia.speak(s.text, s.emotion || 'happy')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const speaking = !!(sia && sia.isSpeaking)

  const advance = (entry) => {
    if (entry) setLog((l) => [...l, entry])
    if (index + 1 >= script.length) {
      onFinish()
    } else {
      setIndex(index + 1)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable transcript */}
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pt-4">
        {log.map((entry, i) =>
          entry.role === 'user' ? (
            <UserBubble key={i} text={entry.text} />
          ) : (
            <DialogueBox
              key={i}
              speaker={entry.speaker}
              text={entry.text}
              color={entry.color}
            />
          )
        )}

        {/* Active "say" line (not yet committed) */}
        {step?.kind === 'say' && (
          <DialogueBox
            speaker={step.speaker}
            text={step.text}
            color={step.color || color}
          />
        )}
      </div>

      {/* Action area */}
      <div className="space-y-3 px-4 pb-5 pt-3">
        {step?.kind === 'say' && (
          <button
            disabled={speaking}
            onClick={() => {
              if (speaking) return
              playClickSound()
              advance({
                role: 'char',
                speaker: step.speaker,
                text: step.text,
                color: step.color || color,
              })
            }}
            className={`w-full rounded-2xl py-3 text-base font-bold text-white ring-1 backdrop-blur transition ${
              speaking
                ? 'cursor-not-allowed bg-white/5 text-white/60 ring-white/10'
                : 'bg-white/15 ring-white/20 active:scale-95'
            }`}
          >
            {speaking ? '🔊 Listening…' : 'Tap to continue →'}
          </button>
        )}

        {step?.kind === 'speak' && (
          <SpeakButton
            phrase={step.phrase}
            onSpeak={(p) => advance({ role: 'user', text: p })}
          />
        )}

        {step?.kind === 'node' &&
          step.render({ done: (entry) => advance(entry) })}
      </div>
    </div>
  )
}
