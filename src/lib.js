// ---- Asset paths -------------------------------------------------------
// Standardized isometric "miniature world" backgrounds — one per zone, all in
// the same art style, camera angle, scale and lighting:
//   World Map  -> level select / location card
//   Mentor Zone-> Sia teaching + MCQ
//   NPC Zone   -> guide conversation
export const TAJ_IMG = '/taj_worldmap.png' // World Map View (location card)
export const SIA_IMG = '/sia.png' // Sia mentor character
// Stage backgrounds
export const SIA_BG = '/taj_mentor.png' // Mentor Zone (Sia teaching + MCQ)
export const GUIDE_BG = '/taj_npc.png' // NPC Zone (guide conversation)
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
