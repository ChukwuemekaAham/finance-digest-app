'use client';

import Image from 'next/legacy/image';
import { FinhubNewsArticle } from '@/types';
import { format } from 'date-fns';

interface NewsCardProps {
  article: FinhubNewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  // Format the date from the Unix timestamp (which is in seconds)
  const formattedDate = format(new Date(article.date * 1000), 'd MMMM yyyy');

  return (
    // The entire card is a link that opens in a new tab
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-row gap-8 overflow-hidden p-0 transition-colors duration-200 hover:bg-[#2A283E] hover:p-4 hover:shadow-lg md:flex-col md:p-4"
    >
      {/* Image Container */}
      <div className="relative h-24 w-24 flex-shrink-0 bg-gray-700 md:aspect-[317/200] md:h-auto md:w-full">
        <Image
          src={article.thumbnail}
          alt={article.title}
          layout="fill"
          sizes="(max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="/window.svg" // A small placeholder image
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent looping
            e.currentTarget.src = '/window.svg';
          }} // Fallback
        />
      </div>
      {/* Text Content Container */}
      <div className="flex flex-grow flex-col py-2 md:p-0 md:pt-2">
        {/* Meta Info (Source and Date) */}
        <div className="mb-2 flex items-center justify-between text-xs font-normal text-[#FFFFFFB2] uppercase">
          <p className="truncate pr-2">{article.source}</p>
          <p className="flex-shrink-0">{formattedDate}</p>
        </div>

        {/* Headline */}
        <div className="hidden sm:block">
          <h3 className="text-[20px] leading-tight font-medium">
            {article.title}
          </h3>
        </div>

        <h3 className="text-[20px] leading-tight font-medium sm:hidden">
          {article.title.length > 50
            ? `${article.title.substring(0, 50)}...`
            : article.title}
        </h3>
      </div>
    </a>
  );
}
