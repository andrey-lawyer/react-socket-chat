import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { ReactNode } from "react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IModalProps) => {
  const modalClassName = isOpen
    ? `${styles.modal} ${styles.modalOpen}`
    : styles.modal;

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <div className={modalClassName}>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <button className={styles.modalClose} onClick={onClose}>
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>{children}</div>
            </div>
          </div>,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

export default Modal;
