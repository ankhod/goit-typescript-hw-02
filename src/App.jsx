import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import styles from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (searchQuery, pageNum) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            query: searchQuery,
            page: pageNum,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );
      return response.data.results;
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    const loadImages = async () => {
      const newImages = await fetchImages(query, page);
      setImages(prev => (page === 1 ? newImages : [...prev, ...newImages]));
    };
    loadImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}
