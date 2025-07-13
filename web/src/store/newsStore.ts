import { create } from 'zustand';
import { FinhubNewsArticle, ApiResponseItem } from '@/types';

interface NewsState {
  articles: FinhubNewsArticle[]; // All articles fetched from the API
  currentPage: number;
  articlesPerPage: number;
  isLoading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
  loadMoreArticles: () => void; // Action to increment the page
}

export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  currentPage: 1,
  articlesPerPage: 12, // Show 12 articles per "page"
  isLoading: true,
  error: null,
  fetchNews: async () => {
    // Prevent re-fetching if we already have data
    if (get().articles.length > 0) {
      set({ isLoading: false });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      // Calls Next.js API route
      const response = await fetch('/api/news');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch news');
      }
      const data: ApiResponseItem[] = await response.json(); // Specify the expected response type

      // Data Mapping
      const mappedArticles: FinhubNewsArticle[] = data
        .filter((item) => item.image && item.headline) // Filter out articles without image or headline
        .map((item) => ({
          id: item.id,
          thumbnail: item.image,
          source: item.source,
          date: item.datetime,
          title: item.headline,
          url: item.url,
        }));

      set({ articles: mappedArticles, isLoading: false, currentPage: 1 });
    } catch (error: unknown) {
      console.error('Error in fetchNews store action:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({ error: errorMessage, isLoading: false });
    }
  },
  loadMoreArticles: () => {
    set((state) => ({ currentPage: state.currentPage + 1 }));
  },
}));
