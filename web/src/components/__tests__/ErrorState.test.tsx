import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorState } from '../ErrorState';

describe('ErrorState Component', () => {
  it('renders the error message and retry button', () => {
    const handleRetry = jest.fn(); // Create a mock function for the retry handler
    render(<ErrorState onRetry={handleRetry} isLoading={false} />);

    // Check for the "NEWS" heading
    expect(screen.getByRole('heading', { name: /news/i })).toBeInTheDocument(); // The "NEWS" heading is on the NewsPage, not inside the ErrorState component itself. This should fail

    // Check for the error message
    expect(
      screen.getByText(/Something went wrong. Please try again later/i)
    ).toBeInTheDocument();

    // Check if the retry button is there
    const retryButton = screen.getByRole('button', { name: /Retry/i }); // The rendered output shows only a <p> tag. The button is missing
    expect(retryButton).toBeInTheDocument();
  });

  it('calls the onRetry function when the button is clicked', () => {
    // Arrange
    const handleRetry = jest.fn();
    render(<ErrorState onRetry={handleRetry} isLoading={false} />);

    // Act
    const retryButton = screen.getByRole('button', { name: /Retry/i });
    fireEvent.click(retryButton);

    // Assert that our mock function was called exactly once
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('disables the button when isLoading is true', () => {
    // Arrange
    const handleRetry = jest.fn();
    render(<ErrorState onRetry={handleRetry} isLoading={true} />);

    // Assert
    const retryButton = screen.getByRole('button', { name: /Retrying/i });
    expect(retryButton).toBeDisabled();
  });
});
