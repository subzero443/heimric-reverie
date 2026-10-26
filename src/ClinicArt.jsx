export default function ClinicArt() {
  return (
    <svg
      className="clinic-art"
      viewBox="0 0 560 550"
      role="img"
      aria-labelledby="clinic-art-title"
    >
      <title id="clinic-art-title">
        Illustration of a physiotherapist guiding a patient's arm movement in a
        calm clinic
      </title>
      <defs>
        <linearGradient id="window-light" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--art-window)" />
          <stop offset="1" stopColor="var(--art-bg)" />
        </linearGradient>
        <linearGradient id="scrub" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-deep)" />
        </linearGradient>
      </defs>
      <path
        d="M80 435V195a180 180 0 0 1 360 0v240Z"
        fill="url(#window-light)"
      />
      <path
        d="M260 28v384M87 204h347"
        stroke="var(--art-line)"
        strokeWidth="3"
        opacity=".6"
      />
      <circle cx="390" cy="120" r="37" fill="var(--art-sun)" opacity=".8" />
      <path
        d="M81 336c62-61 117-55 179-16 66-77 124-65 180-32v147H80Z"
        fill="var(--art-land)"
        opacity=".55"
      />
      <path d="M28 455h504" stroke="var(--art-line)" strokeWidth="2" />
      <ellipse
        cx="290"
        cy="464"
        rx="190"
        ry="17"
        fill="var(--art-line)"
        opacity=".35"
      />
      <path
        d="M475 414c-45-46-43-90-19-120 31 38 27 76 19 120Z"
        fill="var(--art-leaf)"
      />
      <path
        d="M478 414c-8-58 13-89 46-94 2 43-18 72-46 94Z"
        fill="var(--art-leaf)"
        opacity=".7"
      />
      <path
        d="M478 417c-37-18-54-46-45-73 32 14 43 38 45 73Z"
        fill="var(--art-leaf)"
        opacity=".6"
      />
      <path d="m449 408 8 47h42l8-47Z" fill="var(--art-pot)" />
      <path
        d="M144 347v104m200-104v104"
        stroke="var(--art-metal)"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <rect
        x="118"
        y="324"
        width="254"
        height="30"
        rx="13"
        fill="var(--accent-deep)"
      />
      <rect
        x="118"
        y="315"
        width="254"
        height="20"
        rx="10"
        fill="var(--accent)"
      />
      <path d="m229 323 20 65 1 53h27l7-62-11-63Z" fill="#293e54" />
      <path d="m205 321-8 65 19 56h25l-9-63 19-52Z" fill="#3e536a" />
      <path
        d="M214 438h27l4 15h-42c-4-9 5-12 11-15Zm37 0h27l13 10c4 3 1 6-3 6h-38Z"
        fill="#213247"
      />
      <path
        d="M184 208c20-14 54-9 65 11l27 86c2 10-3 20-14 22h-69c-15-2-22-10-18-25Z"
        fill="var(--art-shirt)"
      />
      <path
        d="m193 221-25 54 22 36"
        fill="none"
        stroke="#b97d5e"
        strokeWidth="19"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m238 222 49 23 44-40"
        fill="none"
        stroke="#c89170"
        strokeWidth="19"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m201 187 1 22c6 10 19 13 28 3l-5-26" fill="#b97d5e" />
      <path
        d="M196 144c14-18 45-8 45 15v25c-3 21-30 22-41 2l-8-21Z"
        fill="#c89170"
      />
      <path
        d="M193 166c-13-16-1-40 18-41 17-3 37 9 30 29-11 4-19-2-26-9-1 17-8 16-10 18l-2 13h-7Z"
        fill="#253445"
      />
      <path d="M195 171c-8-8-13 5-2 11" fill="#c89170" />
      <path
        d="m333 313-9 127h27l24-119 4 118h27l6-133Z"
        fill="var(--accent-deep)"
      />
      <path
        d="M327 436h24v18h-41c-4-8 4-13 17-18Zm53 0h26l12 11c5 6 2 8-3 8h-35Z"
        fill="#213247"
      />
      <path
        d="M341 183c15-11 46-10 59 5 13 15 20 87 16 125-29 15-55 10-89 0l7-95Z"
        fill="url(#scrub)"
      />
      <path
        d="m344 203-14 34-36 10"
        fill="none"
        stroke="#8a543f"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m396 208-14 24-44-27"
        fill="none"
        stroke="#9c654a"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m337 188-10 26 20 9 11-25m32-13 14 24-18 15-12-28"
        fill="var(--accent)"
      />
      <path d="m357 161-2 24c5 14 23 14 30 2l-6-29" fill="#8a543f" />
      <path
        d="M348 124c6-21 41-21 47 0l-1 29c-2 20-21 30-36 15-11-11-12-26-10-44Z"
        fill="#9c654a"
      />
      <path
        d="M347 144c-6-13-8-37 7-43 22-13 45-2 46 17 0 10-1 19-7 22l-4-16c-15 5-22-2-30-5l-3 23Z"
        fill="#253445"
      />
      <path d="M351 144c-9-8-12 5-1 11" fill="#9c654a" />
      <path
        d="m360 185 10 14 12-13"
        fill="none"
        stroke="var(--art-window)"
        strokeWidth="2"
      />
      <rect
        x="371"
        y="226"
        width="20"
        height="24"
        rx="3"
        fill="var(--art-window)"
        opacity=".9"
      />
      <path
        d="M381 232v10m-5-5h10"
        stroke="var(--accent-deep)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".55"
      >
        <path d="M139 130v14m-7-7h14M426 256v12m-6-6h12" />
        <path d="M271 160c7-11 21-11 28-1" strokeDasharray="3 6" />
      </g>
    </svg>
  );
}
