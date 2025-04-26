import axios, { AxiosError } from "axios";
import { UnsplashResponse } from "../types/unsplash";

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
  } catch (error: AxiosError) {
    console.error(
      "Unsplash fetch error:",
      error.response?.data || error.message
    );
    if (error.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw new Error(error.response?.data?.error || "Failed to fetch images");
  }
};
