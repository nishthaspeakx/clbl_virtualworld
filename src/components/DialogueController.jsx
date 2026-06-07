import useSiaSpeech from '../useSiaSpeech'
import SiaAvatar from './SiaAvatar'
import Conversation from './Conversation'

// Ties Sia's voice + animation to a scripted dialogue:
//   - renders the animated SiaAvatar (driven by current emotion / speaking state)
//   - drives the Conversation, which speaks each Sia line and gates "Tap to
//     continue" until the voice finishes.
export default function DialogueController({
  script,
  onFinish,
  avatarWrapClass = 'pointer-events-none absolute -left-3 bottom-0 z-0 animate-slideUp',
  avatarClass = '',
  initialEmotion = 'happy',
}) {
  const sia = useSiaSpeech(initialEmotion)

  return (
    <>
      <div className={avatarWrapClass}>
        <SiaAvatar
          emotion={sia.emotion}
          isSpeaking={sia.isSpeaking}
          className={avatarClass}
        />
      </div>
      <div className="relative z-10 h-full">
        <Conversation script={script} sia={sia} onFinish={onFinish} />
      </div>
    </>
  )
}
