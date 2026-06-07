import DialogueBox from './DialogueBox'
import UserBubble from './UserBubble'

// Unified speech bubble.
//   type: 'sia' | 'guide' | 'user'
// Delegates to the existing styled bubbles so Sia and Guide share one API.
export default function DialogueBubble({ speaker, text, type = 'guide' }) {
  if (type === 'user') return <UserBubble text={text} />
  return <DialogueBox speaker={speaker} text={text} color={type} />
}
