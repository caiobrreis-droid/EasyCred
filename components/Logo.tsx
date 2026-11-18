export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`logo${claro ? " logo--claro" : ""}`}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className="logo__marca">
        <rect width="40" height="40" rx="11" fill="currentColor" />
        <path d="M15 11 L30 20 L15 29 Z" fill="#fff" />
        <path d="M9 14 L15.5 18 L9 22 Z" fill="#7CC7FF" />
      </svg>
      <span className="logo__texto">
        Easy<span>Cred</span>
      </span>
    </span>
  );
}
