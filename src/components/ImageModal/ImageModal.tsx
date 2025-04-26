import { useEffect, MouseEvent, KeyboardEvent } from "react";
import "./ImageModal.module.css";

interface ImageModalProps {
  largeImageURL: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown as any);
    return () => {
      window.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default ImageModal;
