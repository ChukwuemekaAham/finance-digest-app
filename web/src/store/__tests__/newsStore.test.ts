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

  it('should handle API errors and update error state', async () => {
    const errorMessage = 'Failed to fetch news';
    // Mock a failed fetch response
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: errorMessage }),
    });

    const { result } = renderHook(() => useNewsStore());

    await act(async () => {
      await result.current.fetchNews();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle network errors and update error state', async () => {
    const networkError = new Error('Network request failed');
    // Mock a fetch that throws an error
    (fetch as jest.Mock).mockRejectedValue(networkError);

    const { result } = renderHook(() => useNewsStore());

    await act(async () => {
      await result.current.fetchNews();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBe(networkError.message);
  });
});
