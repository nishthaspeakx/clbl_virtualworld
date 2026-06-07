import { SIA_IMG, SIA_FALLBACK } from '../lib'

// Renders either Sia (from the uploaded image) or a pure-CSS illustrated
// Indian male tour guide. No external assets needed for the guide.
export default function CharacterAvatar({ type = 'sia', className = '' }) {
  if (type === 'sia') {
    return (
      <img
        src={SIA_IMG}
        alt="Sia, your mentor"
        onError={(e) => {
          if (e.currentTarget.src.indexOf(SIA_FALLBACK) === -1) {
            e.currentTarget.src = SIA_FALLBACK
          }
        }}
        className={`select-none object-contain drop-shadow-2xl ${className}`}
        draggable={false}
      />
    )
  }

  // ---- CSS Guide: Indian male, ~35, neat shirt, ID badge, friendly -----
  return (
    <div className={`relative ${className}`}>
      {/* head */}
      <div className="relative mx-auto h-24 w-24">
        <div className="absolute inset-0 rounded-full bg-[#8a5a3b]" />
        {/* hair */}
        <div className="absolute -top-1 left-1/2 h-12 w-[88px] -translate-x-1/2 rounded-t-full bg-[#1c1410]" />
        {/* ears */}
        <div className="absolute left-0 top-10 h-5 w-5 rounded-full bg-[#7c4f33]" />
        <div className="absolute right-0 top-10 h-5 w-5 rounded-full bg-[#7c4f33]" />
        {/* eyes */}
        <div className="absolute left-6 top-11 h-2.5 w-2.5 rounded-full bg-[#231a12]" />
        <div className="absolute right-6 top-11 h-2.5 w-2.5 rounded-full bg-[#231a12]" />
        {/* eyebrows */}
        <div className="absolute left-5 top-9 h-1 w-4 rounded-full bg-[#1c1410]" />
        <div className="absolute right-5 top-9 h-1 w-4 rounded-full bg-[#1c1410]" />
        {/* nose */}
        <div className="absolute left-1/2 top-[52px] h-3 w-2 -translate-x-1/2 rounded-b-full bg-[#7a4d31]" />
        {/* friendly smile */}
        <div className="absolute left-1/2 top-[66px] h-3 w-9 -translate-x-1/2 rounded-b-full border-b-[3px] border-[#5a2f1c]" />
        {/* moustache */}
        <div className="absolute left-1/2 top-[62px] h-1.5 w-7 -translate-x-1/2 rounded-full bg-[#1c1410]" />
      </div>

      {/* neck */}
      <div className="mx-auto -mt-2 h-4 w-8 bg-[#7c4f33]" />

      {/* shirt / shoulders */}
      <div className="relative mx-auto -mt-1 h-28 w-40 rounded-t-[2.5rem] bg-gradient-to-b from-sky-100 to-sky-200 shadow-xl">
        {/* collar */}
        <div className="absolute left-1/2 top-0 h-7 w-7 -translate-x-1/2 rotate-45 bg-sky-50" />
        <div className="absolute left-1/2 top-1 h-10 w-1 -translate-x-1/2 bg-sky-300/70" />
        {/* ID badge */}
        <div className="absolute right-5 top-7 w-12 rounded-md bg-white p-1 shadow ring-1 ring-slate-200">
          <div className="mx-auto h-4 w-4 rounded-full bg-slate-300" />
          <div className="mt-1 h-1 w-full rounded bg-emerald-500" />
          <div className="mt-0.5 h-1 w-3/4 rounded bg-slate-300" />
          <div className="mt-0.5 text-center text-[5px] font-bold text-slate-500">
            GUIDE
          </div>
        </div>
        {/* lanyard */}
        <div className="absolute right-9 top-0 h-7 w-1 -rotate-12 bg-emerald-500" />
      </div>
    </div>
  )
}
