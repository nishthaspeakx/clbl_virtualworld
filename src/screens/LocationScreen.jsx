import { playClickSound } from '../lib'
import TajImage from '../components/TajImage'

export default function LocationScreen({ onStart }) {
  const start = () => {
    playClickSound()
    onStart()
  }

  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-8">
      {/* Header */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 ring-1 ring-white/15">
          <span>📍</span> Agra · Level 3
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-white drop-shadow">
          Visit the Taj Mahal
        </h1>
      </div>

      {/* Big image card — fills the rest of the screen */}
      <button
        onClick={start}
        className="group relative w-full flex-1 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10 transition active:scale-[0.98]"
      >
        <TajImage className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute right-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-amber-950 shadow">
          ⭐ NEW
        </div>
        {/* Glowing CTA on the image */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bob">
          <div className="animate-glow whitespace-nowrap rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-2.5 text-base font-bold text-white shadow-lg">
            👆 Tap to enter
          </div>
        </div>
      </button>
    </div>
  )
}
