// Shape of a single news article based on data mapping
export interface FinhubNewsArticle {
  id: number;
  thumbnail: string;
  source: string;
  date: number; // Unix timestamp
  title: string;
  url: string;
}

// Response structure from the API
export interface ApiResponseItem {
  id: number;
  image: string;
  source: string;
  datetime: number; // Unix timestamp
  headline: string;
  url: string;
}

// Potential error response
export interface FinhubError {
  error: string;
}
