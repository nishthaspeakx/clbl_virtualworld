import { playClickSound } from '../lib'

// Simulated "speak" button. Real speech recognition is not wired up yet —
// tapping it just confirms the user "said" the phrase.
// Props: phrase, onSpeak, disabled
export default function SpeakButton({ phrase, onSpeak, disabled = false }) {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        playClickSound()
        onSpeak(phrase)
      }}
      className={`group flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-lg font-extrabold text-white shadow-lg transition animate-fadeIn ${
        disabled
          ? 'cursor-not-allowed bg-slate-400/60 shadow-none'
          : 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-orange-500/30 active:scale-95'
      }`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-full bg-white/25 text-xl ${
          disabled ? '' : 'group-active:animate-bounceX motion-safe:animate-pulse'
        }`}
      >
        🎤
      </span>
      <span>Say: {phrase}</span>
    </button>
  )
}
