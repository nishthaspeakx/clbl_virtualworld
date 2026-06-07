// ---- Asset paths -------------------------------------------------------
// Realistic-photo backgrounds:
//   taj.jpg            -> location card (aerial Taj map)
//   siabackground.jpg  -> Sia teaching + MCQ (tourists on the path)
//   guidebackground.png-> guide conversation (entrance gate)
export const TAJ_IMG = '/taj.jpg' // location card
export const SIA_IMG = '/sia.png' // Sia mentor character
// Stage backgrounds
export const SIA_BG = '/siabackground.jpg' // Sia teaching + MCQ
export const GUIDE_BG = '/guidebackground.png' // guide conversation
// Built-in placeholders used automatically if the images above are missing.
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
