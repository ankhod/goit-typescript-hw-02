import { useEffect, MouseEvent } from "react";
import styles from "./ImageModal.module.css";

interface ImageModalProps {
  largeImageURL: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = function (
      this: Window,
      e: globalThis.KeyboardEvent
    ): void {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div className={styles["modal-content"]}>
        <img src={largeImageURL} alt="Large image" />
      </div>
    </div>
  );
};

export default ImageModal;
