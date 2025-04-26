import { PixabayImage } from "../../types/pixabay";
import ImageCard from "../ImageCard/ImageCard";
import "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: PixabayImage[];
  onImageClick: (largeImageURL: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className="gallery">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
