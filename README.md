# SpeakX Learning Adventure — Interactive Prototype

A mobile-first, gamified English-learning prototype (390 × 844 phone frame).
Built with **React + Vite + Tailwind CSS**. Fully interactive — not a video.

## Run it

```bash
npm install
npm run dev        # opens http://localhost:5173
```

Build for production: `npm run build` then `npm run preview`.

## Add your images (optional but recommended)

The prototype ships with built-in SVG placeholders so it runs out of the box.
To use your own uploaded artwork, drop the two files into `public/`:

| File              | What it is                                  |
| ----------------- | ------------------------------------------- |
| `public/taj.jpg`  | The Taj Mahal map / zoom image (location)   |
| `public/sia.png`  | The Sia mentor character (transparent PNG)  |

No code changes needed — they load automatically and the placeholders disappear.
(Paths are configurable in `src/lib.js`.)

## The flow (5 stages)

1. **Location** — Taj Mahal card, "Agra · Level 3", glowing *Start Level*.
2. **Sia teaching** — Sia slides up, teaches "Hello" → "I want to hire a guide" (mic buttons → voice bubbles).
3. **MCQ** — `I ___ to hire a guide` (want / wants), with Correct / Try-again feedback, then Sia teaches "What is the cost?".
4. **Walking transition** — CSS-animated learner walks to the guide marker (auto-advances after 2.5s).
5. **Guide conversation** — CSS-illustrated Indian guide with ID badge; user practices the 3 lines → completion card.

Tapping **Continue Journey** loops back to the start.

## Structure

```
src/
  App.jsx                      # stage state machine + phone frame
  lib.js                       # asset paths, stages, sound hooks
  components/
    Conversation.jsx           # step-driven dialogue engine (shared)
    DialogueBox.jsx            # Sia / Guide speech bubble
    UserBubble.jsx             # user's voice bubble (no avatar shown)
    SpeakButton.jsx            # 🎤 simulated speak button
    CharacterAvatar.jsx        # Sia (image) + CSS guide illustration
    TajImage.jsx               # Taj image with placeholder fallback
  screens/
    LocationScreen.jsx
    SiaTeachingScreen.jsx
    MCQScreen.jsx
    WalkingTransition.jsx
    GuideConversationScreen.jsx
```

## Notes

- **No real speech recognition yet** — speaking is simulated via buttons. The
  user's line only appears after tapping its mic button.
- **Sound hooks** are stubbed in `src/lib.js` (`playClickSound`,
  `playCorrectSound`, `playTransitionSound`) — wire in audio when ready.
- No external APIs; everything runs locally.
