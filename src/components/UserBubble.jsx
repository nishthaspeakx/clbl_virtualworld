// Right-aligned bubble representing the user's spoken line.
// The user character itself is never shown — only their voice.
export default function UserBubble({ text }) {
  return (
    <div className="flex w-full justify-end animate-popIn">
      <div className="flex items-center gap-2 rounded-3xl rounded-br-md bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 shadow-lg">
        <span className="text-base">🗣️</span>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-sky-100/90">
            Your voice
          </div>
          <p className="text-[16px] font-semibold leading-tight text-white">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
