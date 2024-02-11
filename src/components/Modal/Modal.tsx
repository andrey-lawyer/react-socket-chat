import ReactDOM from "react-dom";

import { IModalProps } from "../../types/props.types";
import styles from "./Modal.module.css";

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
