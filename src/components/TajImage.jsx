import { TAJ_IMG, TAJ_FALLBACK } from '../lib'

// Taj Mahal image that falls back to the bundled SVG placeholder if the
// user hasn't dropped their /public/taj.jpg in yet.
export default function TajImage({ className = '', style }) {
  return (
    <img
      src={TAJ_IMG}
      alt="Taj Mahal"
      className={className}
      style={style}
      draggable={false}
      onError={(e) => {
        if (e.currentTarget.src.indexOf(TAJ_FALLBACK) === -1) {
          e.currentTarget.src = TAJ_FALLBACK
        }
      }}
    />
  )
}
