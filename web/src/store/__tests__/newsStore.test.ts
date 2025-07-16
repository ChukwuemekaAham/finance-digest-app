import { useNewsStore } from '../newsStore';
import { act, renderHook } from '@testing-library/react';

// Mock the global fetch function
global.fetch = jest.fn();

describe('useNewsStore', () => {
  // Reset store state before each test
  beforeEach(() => {
    // We can directly call the mocked fetch to reset it
    (fetch as jest.Mock).mockClear();
    // Reset the store to its initial state
    act(() => {
      useNewsStore.setState(useNewsStore.getInitialState());
    });
  });

  it('should have correct initial state', () => {
    const { result } = renderHook(() => useNewsStore());
    expect(result.current.articles).toEqual([]);
    expect(result.current.isLoading).toBe(true); // Default isLoading is true
    expect(result.current.error).toBeNull();
  });

  it('should fetch news and update state on success', async () => {
    const mockNewsData = [
      {
        id: 1,
        image: 'url1',
        source: 'Source 1',
        datetime: 123,
        headline: 'Headline 1',
        url: 'url1',
      },
    ];
    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockNewsData,
    });

    const { result } = renderHook(() => useNewsStore());

    // Use `act` to wrap asynchronous state updates
    await act(async () => {
      await result.current.fetchNews();
    });

    // Assert that the state has been updated correctly
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.articles).toHaveLength(1);
    expect(result.current.articles[0].title).toBe('Headline 1');
  });

  it('should handle API failure gracefully', async () => {
    // Arrange: Mock a failed fetch response
    const errorMessage = 'API is down';
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: errorMessage }),
    });

    // Act: Call the fetchNews action. Ensures all updates are processed before assertions are made
    await act(async () => {
      await useNewsStore.getState().fetchNews();
    });

    // Assert: Check that the error state is updated and articles are empty
    const state = useNewsStore.getState();
    expect(state.error).toBe(errorMessage);
    expect(state.articles).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('should handle network errors gracefully', async () => {
    // Arrange: Mock a network failure by rejecting the fetch promise
    const networkError = new Error('Network request failed');
    (fetch as jest.Mock).mockRejectedValueOnce(networkError);

    // Act
    await act(async () => {
      await useNewsStore.getState().fetchNews();
    });

    // Assert
    const state = useNewsStore.getState();
    expect(state.error).toBe(networkError.message);
    expect(state.articles).toEqual([]);
    expect(state.isLoading).toBe(false);
  });
});
