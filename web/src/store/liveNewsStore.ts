// src/store/liveNewsStore.ts
import { create } from 'zustand';
import { FinhubNewsArticle } from '@/types';

interface LiveNewsState {
  liveArticles: FinhubNewsArticle[];
  connectionStatus: 'connecting' | 'open' | 'closed' | 'error';
  addLiveArticles: (newArticles: FinhubNewsArticle[]) => void;
  setConnectionStatus: (status: LiveNewsState['connectionStatus']) => void;
  clearLiveArticles: () => void;
}

export const useLiveNewsStore = create<LiveNewsState>((set) => ({
  liveArticles: [],
  connectionStatus: 'closed',

  // Adds new articles to the top of the list, keeping a max of 50 for performance
  addLiveArticles: (newArticles) => {
    set((state) => ({
      liveArticles: [...newArticles, ...state.liveArticles].slice(0, 50),
    }));
  },

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  clearLiveArticles: () => set({ liveArticles: [] }),
}));
