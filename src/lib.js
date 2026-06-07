// ---- Asset paths -------------------------------------------------------
// Drop the two uploaded images into the /public folder with these names:
//   public/taj.jpg  -> the Taj Mahal map/zoom image
//   public/sia.png  -> the Sia mentor character image
export const TAJ_IMG = '/taj.jpg'
export const SIA_IMG = '/sia.png'
// Stage backgrounds
export const SIA_BG = '/siabackground.jpg' // Sia teaching + MCQ
export const GUIDE_BG = '/guidebackground.png' // guide conversation
// Built-in placeholders used automatically if the uploads above are missing.
export const TAJ_FALLBACK = '/taj-fallback.svg'
export const SIA_FALLBACK = '/sia-fallback.svg'

// ---- Sound-ready hooks (empty for now) --------------------------------
export const playClickSound = () => {}
export const playCorrectSound = () => {}
export const playTransitionSound = () => {}

// ---- Stages ------------------------------------------------------------
export const STAGES = {
  LOCATION: 'location',
  SIA: 'sia',
  MCQ: 'mcq',
  WALK: 'walk',
  GUIDE: 'guide',
}
