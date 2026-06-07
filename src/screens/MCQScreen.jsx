import { useState } from 'react'
import { playClickSound, playCorrectSound, SIA_BG } from '../lib'
import Conversation from '../components/Conversation'
import SiaAvatar from '../components/SiaAvatar'
import useSiaSpeech from '../useSiaSpeech'
import BackgroundScene from '../components/BackgroundScene'

const OPTIONS = [
  { key: 'A', value: 'want' },
  { key: 'B', value: 'wants' },
]
const CORRECT = 'want'

// Sia's follow-up dialogue, shown only after the answer is correct.
const followUp = () => [
  { kind: 'say', speaker: 'Sia', emotion: 'excited', text: 'Excellent!' },
  { kind: 'say', speaker: 'Sia', emotion: 'helpful', text: 'Then you can say: What is the cost?' },
  { kind: 'speak', phrase: 'What is the cost?' },
  { kind: 'say', speaker: 'Sia', emotion: 'proud', text: 'Great, you are ready now.' },
  { kind: 'say', speaker: 'Sia', emotion: 'excited', text: "Let's talk to the actual guide now." },
  {
    kind: 'node',
    render: ({ done }) => (
      <button
        onClick={() => {
          playClickSound()
          done()
        }}
        className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 py-4 text-xl font-extrabold text-white shadow-lg shadow-emerald-500/30 transition active:scale-95 animate-fadeIn"
      >
        🚶 Meet Guide
      </button>
    ),
  },
]

export default function MCQScreen({ onFinish }) {
  const [picked, setPicked] = useState(null)
  const [correct, setCorrect] = useState(false)
  const [solved, setSolved] = useState(false)
  const sia = useSiaSpeech('helpful')

  const choose = (value) => {
    setPicked(value)
    if (value === CORRECT) {
      playCorrectSound()
      setCorrect(true)
      setTimeout(() => setSolved(true), 1100)
    } else {
      playClickSound()
    }
  }

  return (
    <BackgroundScene image={SIA_BG} overlay="darker">
      <div className="pointer-events-none absolute -left-4 bottom-0 z-0 origin-bottom-left scale-90 animate-slideUp">
        <SiaAvatar emotion={sia.emotion} isSpeaking={sia.isSpeaking} />
      </div>

      <div className="relative z-10 flex h-full flex-col px-5 pt-6">
        {!solved ? (
          <>
            <div className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-amber-300">
              Quick Check
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-2xl animate-popIn">
              <p className="text-center text-2xl font-extrabold text-slate-800">
                I <span className="rounded-md bg-amber-100 px-3 text-amber-600">______</span> to hire a guide.
              </p>

              <div className="mt-6 space-y-3">
                {OPTIONS.map((o) => {
                  const isPicked = picked === o.value
                  const isCorrect = o.value === CORRECT
                  let style =
                    'border-slate-200 bg-slate-50 text-slate-700'
                  if (isPicked && isCorrect)
                    style = 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  else if (isPicked && !isCorrect)
                    style = 'border-rose-500 bg-rose-50 text-rose-700'
                  return (
                    <button
                      key={o.key}
                      onClick={() => choose(o.value)}
                      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left text-lg font-bold transition active:scale-95 ${style}`}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-base font-extrabold shadow ring-1 ring-slate-200">
                        {o.key}
                      </span>
                      {o.value}
                      {isPicked && (
                        <span className="ml-auto text-xl">
                          {isCorrect ? '✅' : '❌'}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Feedback */}
            {correct && (
              <div className="mt-4 rounded-2xl bg-emerald-500 px-4 py-3 text-center text-lg font-extrabold text-white shadow-lg animate-popIn">
                🎉 Correct!
              </div>
            )}
            {picked && picked !== CORRECT && !correct && (
              <div className="mt-4 rounded-2xl bg-rose-500/90 px-4 py-3 text-center font-bold text-white animate-fadeIn">
                Try again. We say: <em>I want to hire a guide.</em>
              </div>
            )}
          </>
        ) : (
          <Conversation
            script={followUp()}
            color="sia"
            sia={sia}
            onFinish={onFinish}
          />
        )}
      </div>
    </BackgroundScene>
  )
}
