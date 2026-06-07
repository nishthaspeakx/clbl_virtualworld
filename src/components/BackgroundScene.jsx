import { TAJ_FALLBACK } from '../lib'

// Reusable full-screen stage background.
//   image   - url to show (cover, centered, 9:16 friendly)
//   overlay - 'dark' | 'darker' | 'none' for text readability
//   zoom    - slow ken-burns zoom-in when true
//   children- content layered above the background
export default function BackgroundScene({
  image,
  overlay = 'dark',
  zoom = false,
  className = '',
  children,
}) {
  const overlayClass =
    overlay === 'darker'
      ? 'bg-black/65'
      : overlay === 'none'
      ? ''
      : 'bg-gradient-to-b from-black/45 via-black/35 to-black/70'

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <img
        src={image}
        alt=""
        draggable={false}
        onError={(e) => {
          if (e.currentTarget.src.indexOf(TAJ_FALLBACK) === -1) {
            e.currentTarget.src = TAJ_FALLBACK
          }
        }}
        className={`absolute inset-0 h-full w-full object-cover object-center ${
          zoom ? 'animate-bgZoom' : ''
        }`}
      />
      {overlayClass && <div className={`absolute inset-0 ${overlayClass}`} />}
      {children}
    </div>
  )
}
