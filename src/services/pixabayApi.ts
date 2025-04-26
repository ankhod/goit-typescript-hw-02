import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY || "YOUR_API_KEY"; // Використовуй .env
const BASE_URL = "https://pixabay.com/api/";

export interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  // Додай інші поля, якщо потрібні
}

export interface PixabayResponse {
  hits: PixabayImage[];
  total: number;
  totalHits: number;
}

interface FetchImagesParams {
  query: string;
  page: number;
  perPage?: number;
}

export const fetchImages = async ({
  query,
  page,
  perPage = 12,
}: FetchImagesParams): Promise<PixabayResponse> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
};
