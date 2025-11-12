export function Loading({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Carregando ${label}`}
      className="flex flex-col items-center justify-center h-dvh gap-8"
    >
      <div className="animate-spin rounded-full h-24 w-24 border border-b-2 border-accent-primary" />
      <span className="text-text-secondary text-2xl md:text-3xl">
        Carregando {label}...
      </span>
    </div>
  );
}
