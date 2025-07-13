import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorState } from '../ErrorState';

describe('ErrorState Component', () => {
  it('renders the error message and retry button', () => {
    const handleRetry = jest.fn(); // Create a mock function for the retry handler
    render(<ErrorState onRetry={handleRetry} />);

    // Check for the "NEWS" heading
    expect(screen.getByRole('heading', { name: /news/i })).toBeInTheDocument();

    // Check for the error message
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Check if the retry button is there
    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('calls the onRetry function when the button is clicked', () => {
    const handleRetry = jest.fn();
    render(<ErrorState onRetry={handleRetry} />);

    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);

    // Assert that our mock function was called exactly once
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
