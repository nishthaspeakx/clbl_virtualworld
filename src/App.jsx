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
    <div className="flex min-h-[100dvh] flex-col items-center justify-center md:py-6">
      {/* Phone frame: fills the device on phones, framed mockup on desktop */}
      <div
        className="relative flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#0b0718] md:h-[844px] md:w-[390px] md:rounded-[2.75rem] md:shadow-2xl md:ring-[10px] md:ring-black/80"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* status bar */}
        <div className="relative z-30 flex shrink-0 items-center justify-between px-6 pt-3 text-[11px] font-semibold text-white/90">
          <span>9:41</span>
          <div className="absolute left-1/2 top-2 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />
          <span className="flex gap-1">📶 🔋</span>
        </div>

        {/* brand + progress */}
        <div className="relative z-30 flex shrink-0 items-center gap-3 px-5 py-2">
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

        {/* active screen — fills remaining height */}
        <div className="relative min-h-0 flex-1 overflow-hidden">{screen}</div>
      </div>
    </div>
  )
}
