import { useCallback, useEffect, useRef, useState } from 'react'
import { playClickSound, GUIDE_BG } from '../lib'
import GuideAvatar from '../components/GuideAvatar'
import DialogueBubble from '../components/DialogueBubble'
import SpeakButton from '../components/SpeakButton'
import useGuideSpeech from '../useGuideSpeech'
import BackgroundScene from '../components/BackgroundScene'

// Conversation flow: guide line -> user reply -> ... -> final guide line.
const flow = [
  { role: 'guide', text: 'Welcome to Taj Mahal.', emotion: 'welcoming' },
  { role: 'user', phrase: 'Hello' },
  { role: 'guide', text: 'What do you need?', emotion: 'curious' },
  { role: 'user', phrase: 'I want to hire a guide' },
  { role: 'guide', text: 'Sure.', emotion: 'reassuring' },
  { role: 'user', phrase: 'What is the cost?' },
  {
    role: 'guide',
    text: 'The cost is 500 rupees for a guided tour.',
    emotion: 'informative',
  },
]

export default function GuideConversationScreen({ onContinue }) {
  const { speak, isGuideSpeaking, currentGuideEmotion } = useGuideSpeech('welcoming')
  const [index, setIndex] = useState(0)
  const [log, setLog] = useState([]) // committed bubbles
  const [listening, setListening] = useState(false)
  const [done, setDone] = useState(false)
  const started = useRef(false)

  // Drive the conversation. Guide steps speak then auto-advance to the next
  // (a user step, where we wait for the speak button). Recursion (not an
  // effect) so StrictMode can't double-run it.
  const runFrom = useCallback(
    async (i) => {
      const step = flow[i]
      if (!step) {
        setDone(true)
        return
      }
      setIndex(i)
      if (step.role === 'guide') {
        setListening(false)
        setLog((l) => [...l, { role: 'guide', text: step.text, emotion: step.emotion }])
        await speak(step.text, step.emotion) // guide-speaking state on/off
        runFrom(i + 1)
      }
      // user step: stop and wait for the speak button
    },
    [speak]
  )

  // Guide greets automatically on mount (once).
  useEffect(() => {
    if (started.current) return
    started.current = true
    runFrom(0)
  }, [runFrom])

  // User taps the mic: show their bubble, guide listens + nods, then continues.
  const handleUserSpeak = (userLine) => {
    playClickSound()
    setLog((l) => [...l, { role: 'user', text: userLine }])
    setListening(true) // guide enters attentive listening state
    setTimeout(() => {
      setListening(false)
      runFrom(index + 1)
    }, 600)
  }

  const step = flow[index]
  const waitingForUser = !done && !isGuideSpeaking && step?.role === 'user' && !listening

  return (
    <BackgroundScene image={GUIDE_BG} overlay="dark">
      {/* Guide on the right — large & interactive */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 animate-slideUp">
        <GuideAvatar
          emotion={currentGuideEmotion}
          isSpeaking={isGuideSpeaking}
          isListening={listening}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {!done ? (
          <>
            {/* transcript */}
            <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pt-4">
              {log.map((entry, i) =>
                entry.role === 'user' ? (
                  <DialogueBubble key={i} type="user" text={entry.text} />
                ) : (
                  <DialogueBubble key={i} type="guide" speaker="Guide" text={entry.text} />
                )
              )}
            </div>

            {/* action area */}
            <div className="space-y-3 px-4 pb-5 pt-3">
              {isGuideSpeaking && (
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-bold text-emerald-200 ring-1 ring-white/15 backdrop-blur">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-300 [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-300 [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-300" />
                  </span>
                  Guide is speaking…
                </div>
              )}
              {listening && (
                <div className="rounded-2xl bg-white/10 py-3 text-center text-sm font-bold text-sky-200 ring-1 ring-white/15 backdrop-blur">
                  👂 Guide is listening…
                </div>
              )}
              {waitingForUser && (
                <SpeakButton phrase={step.phrase} onSpeak={handleUserSpeak} />
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6">
            <div className="w-full rounded-3xl bg-white p-7 text-center shadow-2xl animate-popIn">
              <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-3xl shadow-lg">
                🏆
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800">
                Conversation Started!
              </h2>
              <p className="mt-2 text-base font-medium text-slate-500">
                Great job! You used English at the Taj Mahal.
              </p>
              <div className="mt-4 flex justify-center gap-1 text-2xl">⭐⭐⭐</div>
              <button
                onClick={() => {
                  playClickSound()
                  onContinue()
                }}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 py-4 text-lg font-extrabold text-white shadow-lg transition active:scale-95"
              >
                Continue Journey →
              </button>
            </div>
          </div>
        )}
      </div>
    </BackgroundScene>
  )
}
