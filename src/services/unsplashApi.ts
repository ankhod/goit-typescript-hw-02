import axios from "axios";

const API_KEY =
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "YOUR_UNSPLASH_ACCESS_KEY";
const BASE_URL = "https://api.unsplash.com/search/photos";

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string | null;
}

export interface UnsplashResponse {
  results: UnsplashImage[];
  total: number;
  total_pages: number;
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
}: FetchImagesParams): Promise<UnsplashResponse> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        client_id: API_KEY,
        query,
        page,
        per_page: perPage,
      },
    });
    console.log("Unsplash API response:", response.data); // Дебагінг
    return response.data;
  } catch (error: any) {
    console.error(
      "Unsplash fetch error:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to fetch images");
  }
};
