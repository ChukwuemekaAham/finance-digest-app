'use client';

import { NewsCard } from './NewsCard';
import { NewsCardSkeleton } from './NewsCardSkeleton';
import { FinhubNewsArticle } from '@/types';

// --- Sample JSON Data ---

// This data mimics the structure of the `FinhubNewsArticle` interface.
const sampleArticles = [
  {
    id: 1,
    thumbnail: '', // empty to test fallback and blur effect
    source: 'The Economic Times',
    date: 1623456000, // Unix timestamp for 12 June 2021
    title: 'Markets FTSE slides almost 2pc as sterling sinks to $1.38',
    url: 'https://economictimes.indiatimes.com/',
  },
  {
    id: 2,
    thumbnail: '/finhub.jpg',
    source: 'DailyForex.com',
    date: 1623542400, // 13 June 2021
    title:
      'Sensex ekes out small gain, Nifty50 ends flat; 2 Adani stocks rally up to 9%',
    url: 'https://www.dailyforex.com/',
  },
  {
    id: 3,
    thumbnail: '/finhub.jpg',
    source: 'The Independent',
    date: 1623110400, // 8 June 2021
    title: 'FTSE slumps almost 2% as UK retail sales disappoint',
    url: 'https://www.independent.co.uk/',
  },
  {
    id: 4,
    thumbnail: '/finhub.jpg',
    source: 'The Motley Fool',
    date: 1623283200, // 10 June 2021
    title:
      'FTSE 100 declines after back-to-back positive sessions, Sensex 200...',
    url: 'https://www.fool.com/',
  },
  {
    id: 5,
    thumbnail: '/finhub.jpg',
    source: 'The Economic Times',
    date: 1623792000, // 16 June 2021
    title:
      'Dow Jones Retreats Ahead of FOMC, Nikkei 225 and ASX 200 Open Lower',
    url: 'https://economictimes.indiatimes.com/',
  },
  {
    id: 6,
    thumbnail: '', // empty to test fallback and blur effect
    source: 'DW Industrials',
    date: 1623801600, // 16 June 2021
    title:
      'Dow, S&P post worst week in months after hawkish Fed spooks investors',
    url: 'https://www.dw.com/',
  },
  {
    id: 7,
    thumbnail: '/finhub.jpg',
    source: 'DailyForex.com',
    date: 1623888000, // 17 June 2021
    title:
      'JSE faces mixed Asian markets on Friday as commodities feel pressure',
    url: 'https://www.dailyforex.com/',
  },
  {
    id: 8,
    thumbnail: '/finhub.jpg',
    source: "Barron's",
    date: 1622851200, // 5 June 2021
    title: 'Disney Stock Looks Set to Get a Boost From a Quicker Reopening',
    url: 'https://www.barrons.com/',
  },
];

// --- End Sample JSON Data ---

export function NewsListTest() {
  // For UI development, we can control the loading and error states manually

  // To test the loading state:
  // const isLoading = true;
  // const articles: FinhubNewsArticle[] = [];

  // To test the error state:
  const isLoading = false;
  const articles: FinhubNewsArticle[] = []; // (parent would show error)

  // To test the populated state:
  // const isLoading = false;
  // const articles = sampleArticles;

  // Simulate the loading UI:
  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Simulate the empty state:
  if (!isLoading && articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold">No News Found</h3>
        <p>We couldn&apos;t find any news articles at this time.</p>
      </div>
    );
  }

  // This is the main return path for showing the sample data
  return (
    <div className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
