// Speech bubble shown above a character (Sia or the Guide).
export default function DialogueBox({ speaker, text, color = 'sia' }) {
  const accent =
    color === 'guide'
      ? 'from-emerald-500 to-teal-600'
      : 'from-fuchsia-500 to-violet-600'

  return (
    <div className="animate-popIn w-full">
      <div className="rounded-3xl rounded-bl-md bg-white/95 px-5 py-4 shadow-xl backdrop-blur">
        <div
          className={`mb-1 inline-block bg-gradient-to-r ${accent} bg-clip-text text-xs font-extrabold uppercase tracking-wider text-transparent`}
        >
          {speaker}
        </div>
        <p className="text-[17px] font-semibold leading-snug text-slate-800">
          {text}
        </p>
      </div>
    </div>
  )
}
