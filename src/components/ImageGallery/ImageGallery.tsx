import { UnsplashImage } from "../../types/unsplash";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (largeImageURL: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (!images.length) {
    return <p>No images found.</p>;
  }
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
