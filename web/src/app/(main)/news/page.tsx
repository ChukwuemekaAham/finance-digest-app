'use client';

import { useEffect } from 'react';
import { useNewsStore } from '@/store/newsStore';
import { NewsList } from '@/components/NewsList';
import { NewsListTest } from '@/components/NewsListTest';
import { ErrorState } from '@/components/ErrorState';

export default function NewsPage() {
  const { error, fetchNews } = useNewsStore();

  const isTest = process.env.NEXT_PUBLIC_NODE_ENV === 'test';

  useEffect(() => {
    // Fetch news only once when the component mounts on the client
    fetchNews();
  }, [fetchNews]); // The fetchNews function from Zustand is stable, so this runs once

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-2xl font-bold md:text-5xl md:font-medium">
        {' '}
        NEWS{' '}
      </h2>
      {/* Conditionally render based on error state first */}
      {error ? (
        <ErrorState onRetry={fetchNews} isLoading={false} />
      ) : (
        // If no error, render the NewsList.
        // The NewsList handle showing skeletons when isLoading is true.
        <div>{isTest ? <NewsListTest /> : <NewsList />}</div>
      )}
    </div>
  );
}
