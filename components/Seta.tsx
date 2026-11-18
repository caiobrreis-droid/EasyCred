/** Ícone de seta dos botões; as duas cópias fazem a animação de troca no hover. */
export function Seta() {
  return (
    <span className="btn__icone" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
      <svg viewBox="0 0 24 24">
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}
