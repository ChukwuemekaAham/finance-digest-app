'use client';

import { useNewsStore } from '@/store/newsStore';
import { NewsCard } from './NewsCard';
import { NewsCardSkeleton } from './NewsCardSkeleton';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle, ChevronDown } from 'lucide-react';

export function NewsList() {
  // Get the articles and loading state from the store
  const {
    articles,
    isLoading,
    currentPage,
    articlesPerPage,
    loadMoreArticles,
  } = useNewsStore();

  // Memoize the sliced array of articles to display
  const articlesToDisplay = useMemo(() => {
    // uses the previously calculated (cached) result
    return articles.slice(0, currentPage * articlesPerPage);
  }, [articles, currentPage, articlesPerPage]);

  const hasMoreArticles = articlesToDisplay.length < articles.length;

  // If loading and there are no articles yet, show skeletons
  if (isLoading && articles.length === 0) {
    return (
      <div className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // If not loading and there are no articles, show a 'not found' message
  if (!isLoading && articles.length === 0) {
    return (
      <div className="py-6 text-left">
        <h3 className="text-xl font-semibold">No News Found</h3>
        <p>We couldn&apos;t find any news articles at this time.</p>
      </div>
    );
  }

  // If we have articles, render them
  return (
    <>
      <div className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {articlesToDisplay.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
      {/* Load More Button */}
      {hasMoreArticles && (
        <div className="mt-12 flex justify-center">
          <Button
            onClick={loadMoreArticles}
            disabled={isLoading} // Disable while the initial fetch is happening
            className="bg-blott-accent-blue inline-flex cursor-pointer items-center gap-2 rounded-md px-8 py-3 text-base font-bold text-white hover:opacity-90 disabled:opacity-50" // Added inline-flex and gap
          >
            {isLoading ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span>Load More</span>
                <ChevronDown className="h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
}
