import { PixabayImage } from "../../types/pixabay";
import "./ImageCard.module.css";

interface ImageCardProps {
  image: PixabayImage;
  onImageClick: (largeImageURL: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <li className="gallery-item">
      <img
        className="gallery-item-image"
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    </li>
  );
};

export default ImageCard;
