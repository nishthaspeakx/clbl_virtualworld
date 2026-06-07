// One CONNECTED SVG Indian male tour guide (~35): neck → torso → shoulders →
// arms → hands are all joined; no floating limbs. Professional shirt + ID badge.
// All motion stays class-driven (see index.css) so the existing voice/flow,
// lip-sync, blinking, head nod and emotion logic keep working unchanged.
// Props:
//   emotion     - welcoming | happy | curious | helpful | friendly | reassuring | informative | confident
//   isSpeaking  - mouth lip-sync + head nod + shoulder shift + arm gesture
//   isListening - calm breathing + attentive nod
export default function GuideAvatar({
  emotion = 'welcoming',
  isSpeaking = false,
  isListening = false,
  className = '',
}) {
  // palette
  const skin = '#b67d50'
  const skinD = '#9c6c44'
  const hair = '#1b1410'
  const shirt = '#e7eef5'
  const sleeve = '#dde7f1'
  const green = '#2f7d5b'

  return (
    <svg
      viewBox="0 0 240 320"
      className={`guide-avatar gemo-${emotion} ${isSpeaking ? 'guide-speaking' : ''} ${
        isListening ? 'guide-listening' : ''
      } ${className}`}
    >
      <g className="guide-body">
        {/* LEFT arm (relaxed) — behind torso so it reads as next to the body */}
        <g className="guide-left-arm">
          <g className="guide-left-upper-arm">
            <line x1="176" y1="170" x2="192" y2="226" stroke={shirt} strokeWidth="22" strokeLinecap="round" />
          </g>
          <g className="guide-left-forearm">
            <line x1="192" y1="226" x2="186" y2="276" stroke={sleeve} strokeWidth="20" strokeLinecap="round" />
            <g className="guide-left-hand">
              <circle cx="186" cy="285" r="12" fill={skin} />
            </g>
          </g>
        </g>

        {/* NECK — tucked under the collar */}
        <g className="guide-neck">
          <rect x="106" y="124" width="28" height="40" rx="12" fill={skinD} />
        </g>

        {/* TORSO / shirt — covers the shoulder seams (keeps arms connected) */}
        <g className="guide-torso">
          <path
            d="M34,320 L34,212 C34,182 58,166 92,159 Q120,155 148,159 C182,166 206,182 206,212 L206,320 Z"
            fill={shirt}
          />
          {/* shoulder shading */}
          <path d="M34,212 C34,182 58,166 92,159 L92,176 C64,182 48,196 46,220 Z" fill="#d7e2ee" />
          <path d="M206,212 C206,182 182,166 148,159 L148,176 C176,182 192,196 194,220 Z" fill="#d7e2ee" />
          {/* collar */}
          <path d="M104,160 L120,184 L136,160 Z" fill="#f4f8fc" />
          <path d="M104,160 L120,184" stroke="#b9c9d8" strokeWidth="2" />
          <path d="M136,160 L120,184" stroke="#b9c9d8" strokeWidth="2" />
          {/* placket + buttons */}
          <line x1="120" y1="184" x2="120" y2="300" stroke="#c4d2df" strokeWidth="2.5" />
          <circle cx="120" cy="206" r="2.6" fill="#aebccb" />
          <circle cx="120" cy="240" r="2.6" fill="#aebccb" />
          <circle cx="120" cy="274" r="2.6" fill="#aebccb" />
        </g>

        {/* ID badge on a lanyard */}
        <g className="guide-id-badge">
          <line x1="110" y1="178" x2="148" y2="214" stroke={green} strokeWidth="3.5" />
          <line x1="130" y1="178" x2="148" y2="214" stroke={green} strokeWidth="3.5" />
          <rect x="132" y="212" width="34" height="42" rx="5" fill="#ffffff" stroke="#e3e9ef" />
          <circle cx="149" cy="226" r="6.5" fill="#cdd7df" />
          <rect x="139" y="237" width="20" height="3.5" rx="1.8" fill={green} />
          <rect x="141" y="244" width="16" height="2.6" rx="1.3" fill="#cdd7df" />
        </g>

        {/* RIGHT arm (welcoming, raised) — in front of torso, fully visible */}
        <g className="guide-right-arm">
          <g className="guide-right-upper-arm">
            <line x1="64" y1="170" x2="42" y2="206" stroke={shirt} strokeWidth="22" strokeLinecap="round" />
          </g>
          <g className="guide-right-forearm">
            <line x1="42" y1="206" x2="50" y2="142" stroke={sleeve} strokeWidth="20" strokeLinecap="round" />
            {/* cuff */}
            <line x1="44" y1="150" x2="56" y2="150" stroke="#c4d2df" strokeWidth="3" strokeLinecap="round" />
            <g className="guide-right-hand">
              <circle cx="50" cy="132" r="12.5" fill={skin} />
              {/* thumb */}
              <circle cx="61" cy="136" r="5" fill={skin} />
              {/* finger creases */}
              <line x1="44" y1="124" x2="44" y2="132" stroke={skinD} strokeWidth="1.4" />
              <line x1="50" y1="122" x2="50" y2="130" stroke={skinD} strokeWidth="1.4" />
              <line x1="56" y1="124" x2="56" y2="132" stroke={skinD} strokeWidth="1.4" />
            </g>
          </g>
        </g>

        {/* HEAD */}
        <g className="guide-head">
          {/* ears */}
          <circle cx="78" cy="88" r="10" fill={skinD} />
          <circle cx="162" cy="88" r="10" fill={skinD} />
          {/* hair (back) */}
          <path d="M72,86 C66,34 174,34 168,86 C168,58 150,50 120,50 C90,50 72,58 72,86 Z" fill={hair} />
          {/* face */}
          <ellipse cx="120" cy="84" rx="44" ry="50" fill={skin} />
          {/* hairline / fringe */}
          <path d="M76,72 C74,40 166,40 164,72 C150,56 90,56 76,72 Z" fill={hair} />

          {/* eyebrows */}
          <g className="guide-eyebrows">
            <rect x="92" y="64" width="26" height="5" rx="2.5" fill="#2a1c12" transform="rotate(-4 105 66)" />
            <rect x="122" y="64" width="26" height="5" rx="2.5" fill="#2a1c12" transform="rotate(4 135 66)" />
          </g>

          {/* eyes */}
          <g className="guide-eyes">
            <g className="guide-eye">
              <ellipse cx="103" cy="84" rx="12" ry="13" fill="#fbfbfb" />
              <g className="guide-pupil">
                <circle cx="103" cy="85" r="6.6" fill="#3a2716" />
                <circle cx="100.5" cy="82.5" r="2" fill="#fff" />
              </g>
              <rect className="guide-eyelid" x="90" y="70" width="26" height="15" fill={skin} />
            </g>
            <g className="guide-eye">
              <ellipse cx="137" cy="84" rx="12" ry="13" fill="#fbfbfb" />
              <g className="guide-pupil">
                <circle cx="137" cy="85" r="6.6" fill="#3a2716" />
                <circle cx="134.5" cy="82.5" r="2" fill="#fff" />
              </g>
              <rect className="guide-eyelid" x="124" y="70" width="26" height="15" fill={skin} />
            </g>
          </g>

          {/* nose */}
          <path d="M119,90 Q114,104 123,104" stroke={skinD} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* moustache */}
          <path d="M103,107 Q120,116 137,107 Q120,111 103,107 Z" fill="#241811" />

          {/* mouth */}
          <g className="guide-mouth">
            <path
              className="mouth-smile"
              d="M106,114 Q120,126 134,114"
              stroke="#6e2b20"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <g className="mouth-open">
              <ellipse cx="120" cy="118" rx="11" ry="8" fill="#7a3327" />
              <rect x="111" y="111" width="18" height="4" rx="2" fill="#fdf7f3" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
