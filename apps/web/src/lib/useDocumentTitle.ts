import { useEffect } from 'react';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Códice do Cristal` : 'Códice do Cristal';
  }, [title]);
}
