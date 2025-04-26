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
