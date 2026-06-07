import { SIA_BG } from '../lib'
import BackgroundScene from '../components/BackgroundScene'
import DialogueController from '../components/DialogueController'

const script = [
  { kind: 'say', speaker: 'Sia', emotion: 'happy', text: 'Hello, welcome to Taj Mahal.' },
  { kind: 'say', speaker: 'Sia', emotion: 'helpful', text: 'Yahan aapko guide chahiyega.' },
  {
    kind: 'say',
    speaker: 'Sia',
    emotion: 'helpful',
    text: 'I will help you how to talk to a guide in English.',
  },
  { kind: 'say', speaker: 'Sia', emotion: 'playful', text: "Start with 'Hello'." },
  { kind: 'speak', phrase: 'Hello' },
  {
    kind: 'say',
    speaker: 'Sia',
    emotion: 'proud',
    text: 'Very good! Say: I want to hire a guide.',
  },
  { kind: 'speak', phrase: 'I want to hire a guide' },
]

export default function SiaTeachingScreen({ onFinish }) {
  return (
    <BackgroundScene image={SIA_BG} overlay="dark" zoom>
      {/* Sia (animated) + voiced dialogue */}
      <DialogueController
        script={script}
        onFinish={onFinish}
        avatarWrapClass="pointer-events-none absolute -left-3 bottom-0 z-0 animate-slideUp"
      />
    </BackgroundScene>
  )
}
