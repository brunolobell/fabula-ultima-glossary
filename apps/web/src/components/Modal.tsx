import { useEffect, useId, useRef, type ReactNode } from 'react';

interface Props {
  open: boolean;
  /** Called on Esc, on a click outside the panel and on the close button. */
  onClose: () => void;
  title: string;
  /** Rendered at the right of the title bar, before the close button. */
  actions?: ReactNode;
  children: ReactNode;
}

/**
 * A native `<dialog>` opened with `showModal()`: the browser traps focus,
 * makes the page inert and returns focus to the opener. Full screen on a phone,
 * a centered panel from `sm`.
 */
export function Modal({ open, onClose, title, actions, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      // jsdom has no showModal; fall back to the plain attribute.
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal m-0 h-full max-h-none w-full max-w-none sm:m-auto sm:h-auto sm:max-h-[92vh] sm:w-[min(64rem,calc(100vw-2rem))] sm:rounded"
      aria-labelledby={titleId}
      onCancel={(event) => {
        // Esc: let React state close it, so the URL and the dialog agree.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="flex h-full max-h-[inherit] flex-col sm:max-h-[92vh]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2 sm:px-6">
            <h2
              id={titleId}
              className="mr-auto font-heading text-[26px] uppercase leading-tight tracking-wider text-heading"
            >
              {title}
            </h2>
            {actions}
            <button type="button" className="chip" onClick={onClose}>
              Fechar
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
