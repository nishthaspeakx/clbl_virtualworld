import { useEffect } from 'react'
import { SIA_BG, GUIDE_BG, TAJ_FALLBACK, playTransitionSound } from '../lib'

// Coded walking transition (no video). Crossfades the Sia-area background into
// the guide-area background while a learner silhouette walks forward, then
// auto-advances to the guide screen.
//   fromImage -> shown first (siabackground.jpg)
//   toImage   -> faded in (guidebackground.png)
export default function WalkingTransition({
  fromImage = SIA_BG,
  toImage = GUIDE_BG,
  onComplete,
}) {
  useEffect(() => {
    playTransitionSound()
    const t = setTimeout(() => onComplete && onComplete(), 2500)
    return () => clearTimeout(t)
  }, [onComplete])

  const onImgError = (e) => {
    if (e.currentTarget.src.indexOf(TAJ_FALLBACK) === -1) {
      e.currentTarget.src = TAJ_FALLBACK
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* from-image: zooms in and fades out */}
      <img
        src={fromImage}
        alt=""
        onError={onImgError}
        className="absolute inset-0 h-full w-full origin-center animate-bgZoomFast animate-crossFadeOut object-cover object-center"
      />
      {/* to-image: zooms in and fades in (stacked above) */}
      <img
        src={toImage}
        alt=""
        onError={onImgError}
        className="absolute inset-0 h-full w-full origin-center animate-bgZoomFast animate-crossFadeIn object-cover object-center"
      />

      {/* darkening + soft glow vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      <div className="pointer-events-none absolute inset-0 animate-softPulse bg-[radial-gradient(circle_at_50%_60%,transparent_40%,rgba(0,0,0,0.35))]" />

      {/* learner walking from bottom-left to center-right */}
      <div className="absolute z-10 animate-walkForward text-5xl drop-shadow-lg">
        <span className="inline-block blur-[0.3px]">🚶</span>
      </div>

      {/* walking text */}
      <div className="absolute bottom-12 left-0 right-0 z-10 text-center">
        <p className="text-lg font-extrabold text-white drop-shadow">
          Walking to the guide
          <span className="animate-pulse">…</span>
        </p>
        <div className="mx-auto mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-full origin-left animate-crossFadeIn rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
        </div>
      </div>
    </div>
  )
}
