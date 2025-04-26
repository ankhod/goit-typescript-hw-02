import axios, { AxiosError } from "axios";
import { UnsplashResponse } from "../types/unsplash";

// Інтерфейс для помилок Unsplash API
interface UnsplashError {
  error?: string;
}

const API_KEY =
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "YOUR_UNSPLASH_ACCESS_KEY";
const BASE_URL = "https://api.unsplash.com/search/photos";

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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<UnsplashError>;
      console.error(
        "Unsplash fetch error:",
        axiosError.response?.data || axiosError.message
      );
      if (axiosError.response?.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(
        axiosError.response?.data?.error || "Failed to fetch images"
      );
    }
    console.error("Unexpected error:", error);
    throw new Error("Failed to fetch images");
  }
};
