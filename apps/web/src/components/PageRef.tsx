export function PageRef({ page }: { page: number | null }) {
  if (page === null) return null;
  return (
    <span className="text-muted">
      ver Livro Básico, página <strong className="text-ink">{page}</strong>
    </span>
  );
}
