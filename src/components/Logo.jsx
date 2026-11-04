// Logo de InformeClaro (marca registrada en public/favicon.svg; se conserva tal cual).
export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#0f766e" />
      <path d="M20 14h18l10 10v26a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" fill="#fff" />
      <path d="M38 14v10h10" fill="#ccfbf1" />
      <path d="M22 38h6l3-7 4 12 3-5h6" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
