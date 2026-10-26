const paths = {
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  download: <><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5" /></>,
  play: <path d="m8 4 12 8-12 8V4Z" />,
  pause: <><path d="M8 5v14M16 5v14" /></>,
  chart: <><path d="M3 3v18h18M6 15l5-5 4 3 6-7" /></>,
  video: (
    <>
      <rect x="2" y="5" width="14" height="14" rx="3" />
      <path d="m16 9 6-3v12l-6-3" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7M5 9v12h14V9" />
      <path d="M9 21v-7h6v7" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </>
  ),
  diagonal: (
    <>
      <path d="M6 18 18 6M6 6h12v12" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c0 3-2 4-4 4C10 20 4 14 3 7c0-2 1-4 4-4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  heart: (
    <>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3 12h5l2-4 3 8 2-4h6" />
    </>
  ),
  movement: (
    <>
      <circle cx="14" cy="4" r="2" />
      <path d="m4 10 5-1 4-3 4 5 4 1M10 9l3 5-6 7m6-7 4 2 2 5" />
    </>
  ),
  spine: (
    <>
      <path d="M15 3c-7 4 1 7-5 12-3 2-2 4-1 6M10 4l5 1M9 8l5 1m-5 3 5 1m-7 3 5 2m-6 2 5 1" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5c-1-4-7-3-7 2-4 1-4 7 0 8-1 5 6 7 7 3m0-13c1-4 7-3 7 2 4 1 4 7 0 8 1 5-6 7-7 3V5Z" />
      <path d="M7 7c3 0 3 4 1 5m9-5c-3 0-3 4-1 5M5 15l3-1m11 1-3-1" />
    </>
  ),
  medical: (
    <>
      <rect x="3" y="6" width="18" height="15" rx="3" />
      <path d="M8 6V3h8v3m-4 5v6m-3-3h6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 3v4m10-4v4M3 11h18m-14 4h2m6 0h2m-10 3h2" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" />
      <path d="M8 10h8m-8 4h5" />
    </>
  ),
  palette: (
    <>
      <circle cx="8" cy="9" r=".6" />
      <circle cx="12" cy="6" r=".6" />
      <circle cx="16" cy="9" r=".6" />
      <path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 .8-2.8H17a4 4 0 0 0 4-4C21 6 17 3 12 3Z" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  down: <path d="m7 10 5 5 5-5" />,
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
};

export function Icon({ name, size = 20, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name] || paths.heart}
    </svg>
  );
}

export function BrandMark({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="15" fill="currentColor" />
      <path
        d="M24 12v24M12 24h24"
        stroke="var(--on-accent, white)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        className="brand-pulse"
        d="m11 25 8-4 5 8 5-11 8 6"
        stroke="var(--brand-line, #a7d9ff)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
