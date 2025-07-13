// src/components/NewsCardSkeleton.tsx

export function NewsCardSkeleton() {
  return (
    // Apply the same responsive flex/grid logic as the real card
    <div className="bg-blott-card-bg flex animate-pulse flex-row gap-4 overflow-hidden rounded-lg p-0 md:flex-col">
      {/* Skeleton Image */}
      <div className="h-24 w-24 flex-shrink-0 rounded-md bg-gray-700 md:aspect-[317/200] md:h-auto md:w-full md:rounded-t-lg md:rounded-b-none"></div>
      {/* Skeleton Text */}
      <div className="flex flex-grow flex-col justify-between space-y-2">
        <div className="flex flex-row items-start justify-between">
          <div className="h-4 w-2/4 rounded bg-gray-700"></div>
          <div className="h-4 w-1/3 rounded bg-gray-700"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-gray-700"></div>
          <div className="h-5 w-full rounded bg-gray-700 sm:hidden"></div>
          <div className="h-5 w-5/6 rounded bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
