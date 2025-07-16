import { useNewsStore } from '@/store/newsStore';

interface ErrorStateProps {
  onRetry: () => void;
  isLoading: boolean; // <-- Receive loading state as a prop
}

export function ErrorState({ onRetry, isLoading }: ErrorStateProps) {
  const isSuggested = process.env.NEXT_PUBLIC_SUGGESTED === 'true'; // Check the environment variable

  return (
    <div
      className={`py-${isSuggested ? '20' : '6'} ${isSuggested ? 'text-center' : 'text-left'}`}
    >
      <p className="mb-6 text-[20px] font-medium">
        Something went wrong. Please try again later.
      </p>
      {isSuggested && ( // Conditionally render the retry button
        <button
          onClick={onRetry}
          disabled={isLoading}
          className="cursor-pointer rounded-md bg-[#55ACEE] px-6 py-2 font-bold text-white hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? 'Retrying...' : 'Retry'}
        </button>
      )}
    </div>
  );
}
