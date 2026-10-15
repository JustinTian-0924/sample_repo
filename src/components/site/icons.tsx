export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="13" fill="currentColor" />
      <path
        d="m24 8 4 10 6-4-1 9 7-1-8 10-6 1v8h-4v-8l-6-1-8-10 7 1-1-9 6 4 4-10Z"
        fill="white"
      />
    </svg>
  )
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  )
}

export function ServiceIcon({ type }: { type: 'study' | 'visa' | 'immigration' }) {
  const paths = {
    study: 'm3 9 9-5 9 5-9 5-9-5Zm4 3v5c3 3 7 3 10 0v-5m4-3v8',
    visa: 'M6 3h9l4 4v14H6V3Zm9 0v5h4M9 12h7m-7 4h5',
    immigration: 'M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  }

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[type]} />
    </svg>
  )
}
