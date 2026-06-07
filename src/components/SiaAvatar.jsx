// Fully CSS-animated Sia. Lip-sync, blinking, eye darts, head nod, breathing
// and per-emotion expressions are all driven by classes (see index.css).
// Props:
//   emotion    - 'happy' | 'excited' | 'serious' | 'proud' | 'playful' | 'helpful'
//   isSpeaking - boolean; adds .sia-speaking to animate the mouth/head/eyes
export default function SiaAvatar({ emotion = 'happy', isSpeaking = false, className = '' }) {
  return (
    <div
      className={`sia-avatar emo-${emotion} ${isSpeaking ? 'sia-speaking' : ''} ${className}`}
    >
      {/* soft glow */}
      <div className="sia-glow" />

      {/* long hair flowing down both sides (behind the shoulders) */}
      <div className="sia-hair-side left" />
      <div className="sia-hair-side right" />

      {/* shoulders / turtleneck — breathes */}
      <div className="sia-shoulders" />
      <div className="sia-neck" />

      {/* head — nods while speaking */}
      <div className="sia-head">
        <div className="sia-hair-back" />
        <div className="sia-face">
          <div className="sia-brow left" />
          <div className="sia-brow right" />

          <div className="sia-eyes">
            <div className="sia-eye left">
              <span className="pupil" />
              <span className="eyelid" />
            </div>
            <div className="sia-eye right">
              <span className="pupil" />
              <span className="eyelid" />
            </div>
          </div>

          <div className="sia-nose" />
          <div className="sia-cheek left" />
          <div className="sia-cheek right" />
          <div className="mouth" />
        </div>

        {/* center-parted crown + face-framing front locks */}
        <div className="sia-hair-top" />
        <div className="sia-hair-front left" />
        <div className="sia-hair-front right" />
      </div>
    </div>
  )
}
