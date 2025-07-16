'use client';

import { useLiveNewsStore } from '@/store/liveNewsStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { NewsCard } from '@/components/NewsCard'; // Reuse the existing card
import { AlertCircle } from 'lucide-react';

function ConnectionStatus() {
  const status = useLiveNewsStore((state) => state.connectionStatus);

  let statusText = 'Connecting...';
  let statusColor = 'text-yellow-400';

  switch (status) {
    case 'open':
      statusText = 'Live';
      statusColor = 'text-green-400';
      break;
    case 'closed':
      statusText = 'Disconnected';
      statusColor = 'text-red-500';
      break;
    case 'error':
      statusText = 'Connection Error';
      statusColor = 'text-red-500';
      break;
  }

  return (
    <div className="mb-4 flex items-center gap-2">
      <div
        className={`h-3 w-3 animate-pulse rounded-full ${
          status === 'open'
            ? 'bg-green-400'
            : status === 'connecting'
              ? 'bg-yellow-400'
              : 'bg-red-500'
        }`}
      ></div>
      <span className={`text-sm font-semibold ${statusColor}`}>
        {statusText}
      </span>
    </div>
  );
}

export default function LiveNewsPage() {
  // This hook initiates and manages the WebSocket connection
  useWebSocket();

  // Subscribe to the liveArticles state from the store
  const liveArticles = useLiveNewsStore((state) => state.liveArticles);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-poppins text-h2 font-semibold">Live News Feed</h2>
        <ConnectionStatus />
      </div>

      {liveArticles.length === 0 ? (
        <div className="text-blott-text-gray py-20 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12" />
          <h3 className="text-xl font-semibold">Awaiting Real-time News...</h3>
          <p>
            The connection is live. New articles will appear here as they are
            published.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {liveArticles.map((article) => (
            <NewsCard key={`${article.id}-${article.date}`} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
