import { Link } from 'react-router-dom';
import { AlertIcon } from './Icons';

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Carregando" role="status" className="mt-4">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="border-b border-line py-4">
          <span className="skeleton w-2/5" style={{ height: '1.25rem' }} />
          <span className="skeleton mt-3 w-full" />
          <span className="skeleton mt-2 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando" role="status">
      <span className="skeleton w-3/5" style={{ height: '2.5rem' }} />
      <span className="skeleton mt-6 w-full" style={{ height: '5rem' }} />
      <span className="skeleton mt-6 w-full" style={{ height: '3rem' }} />
      <span className="skeleton mt-6 w-full" />
      <span className="skeleton mt-2 w-5/6" />
      <span className="skeleton mt-2 w-2/3" />
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div role="alert" className="highlight-key">
      <p className="flex items-center gap-2 font-bold text-accent-ink">
        <AlertIcon className="shrink-0" />
        Não foi possível carregar o conteúdo.
      </p>
      <p className="mt-1">Verifique sua conexão e tente de novo.</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="chip mt-3">
          Tentar de novo
        </button>
      )}
    </div>
  );
}

export function NotFoundState({ what = 'página' }: { what?: string }) {
  return (
    <div>
      <h1 className="h-main">Não encontrado</h1>
      <p className="mt-6">
        Não encontramos essa {what}. Ela pode ter mudado de nome: tente a busca.
      </p>
      <p className="mt-3">
        <Link to="/buscar">Ir para a busca</Link> ou{' '}
        <Link to="/">voltar ao início</Link>.
      </p>
    </div>
  );
}
