import { useState } from 'react'
import { STAGES, SIA_BG, GUIDE_BG } from './lib'
import LocationScreen from './screens/LocationScreen'
import SiaTeachingScreen from './screens/SiaTeachingScreen'
import MCQScreen from './screens/MCQScreen'
import WalkingTransition from './screens/WalkingTransition'
import GuideConversationScreen from './screens/GuideConversationScreen'

export default function App() {
  const [stage, setStage] = useState(STAGES.LOCATION)

  const screen = {
    [STAGES.LOCATION]: <LocationScreen onStart={() => setStage(STAGES.SIA)} />,
    [STAGES.SIA]: <SiaTeachingScreen onFinish={() => setStage(STAGES.MCQ)} />,
    [STAGES.MCQ]: <MCQScreen onFinish={() => setStage(STAGES.WALK)} />,
    [STAGES.WALK]: (
      <WalkingTransition
        fromImage={SIA_BG}
        toImage={GUIDE_BG}
        onComplete={() => setStage(STAGES.GUIDE)}
      />
    ),
    [STAGES.GUIDE]: (
      <GuideConversationScreen onContinue={() => setStage(STAGES.LOCATION)} />
    ),
  }[stage]

  const order = [
    STAGES.LOCATION,
    STAGES.SIA,
    STAGES.MCQ,
    STAGES.WALK,
    STAGES.GUIDE,
  ]
  const progress = (order.indexOf(stage) / (order.length - 1)) * 100

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Phone frame: 390 x 844 */}
      <div
        className="relative overflow-hidden rounded-[2.75rem] bg-[#0b0718] shadow-2xl ring-[10px] ring-black/80"
        style={{ width: 390, height: 844 }}
      >
        {/* status bar */}
        <div className="relative z-30 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-white/90">
          <span>9:41</span>
          <div className="absolute left-1/2 top-2 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />
          <span className="flex gap-1">📶 🔋</span>
        </div>

        {/* brand + progress */}
        <div className="relative z-30 flex items-center gap-3 px-5 py-2">
          <div className="flex items-center gap-1 text-sm font-extrabold">
            <span className="text-amber-400">Speak</span>
            <span className="text-white">X</span>
          </div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-amber-300">L3</span>
        </div>

        {/* active screen */}
        <div className="absolute inset-x-0 bottom-0 top-[78px]">{screen}</div>
      </div>
    </div>
  )
}
