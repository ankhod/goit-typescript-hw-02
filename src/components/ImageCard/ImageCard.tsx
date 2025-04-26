import { UnsplashImage } from "../../types/unsplash";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  image: UnsplashImage;
  onImageClick: (largeImageURL: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <li className={styles["gallery-item"]}>
      <img
        className={styles["gallery-item-image"]}
        src={image.urls.small}
        alt={image.alt_description || "Image"}
        onClick={() => onImageClick(image.urls.full)}
      />
    </li>
  );
};

export default ImageCard;
