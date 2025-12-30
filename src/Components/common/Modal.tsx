/**
 * Reusable modal component with internal open/close controls.
 *
 * Features:
 * - Manages its own `isOpen` state with `open()` and `close()` helpers
 * - Optional `renderTrigger(open)` to provide a custom button/element that opens the modal
 * - Close via overlay click, close button, or Escape key
 * - Accepts either `children` (static content) or `renderContent(close)` (render-prop that receives a close handler)
 * - Basic accessibility: `role="dialog"`, `aria-modal="true"`, focus management on open
 *
 * @remarks
 * Styling is defined in `src/Components/common/styles/modal.css`. Override classes via your CSS if needed.
 *
 * @example Using a custom trigger and render-prop content
 * ```tsx
 * <Modal
 *   renderTrigger={(open) => <button onClick={open}>Open details</button>}
 *   renderContent={(close) => (
 *     <div>
 *       <h3>Details</h3>
 *       <p>Some content here...</p>
 *       <button onClick={close}>Done</button>
 *     </div>
 *   )}
 * />
 * ```
 *
 * @example Using static children and the default trigger
 * ```tsx
 * <Modal openButtonText="Show info">
 *   <p>This is modal content</p>
 * </Modal>
 * ```
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import './styles/modal.css';

export type ModalProps = {
    initialOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    renderTrigger?: (open: () => void) => ReactNode;
    openButtonText?: string;
    children?: ReactNode;
    renderContent?: (close: () => void) => ReactNode;
};

const Modal = ({
    initialOpen = false,
    onOpenChange,
    renderTrigger,
    openButtonText = 'Open',
    children,
    renderContent,
}: ModalProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    const open = useCallback(() => {
        setIsOpen(true);
        onOpenChange?.(true);
    }, [onOpenChange]);

    const close = useCallback(() => {
        setIsOpen(false);
        onOpenChange?.(false);
    }, [onOpenChange]);

    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                close();
            }
        };

        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, close]);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.focus();
        }
    }, [isOpen]);

    const handleOverlayClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                close();
            }
        },
        [close]
    );

    const trigger = renderTrigger ? (
        renderTrigger(open)
    ) : (
        <button type="button" className="modal-trigger" onClick={open}>
            {openButtonText}
        </button>
    );

    return (
        <>
            {trigger}
            {isOpen && (
                <div className={'modal-overlay'} onClick={handleOverlayClick}>
                    <div
                        className={'modal'}
                        role="dialog"
                        aria-modal="true"
                        ref={dialogRef}
                        tabIndex={-1}
                    >
                        <div className="modal-header">
                            <button type="button" className="modal-close" aria-label="Close" onClick={close}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            {renderContent ? renderContent(close) : children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;