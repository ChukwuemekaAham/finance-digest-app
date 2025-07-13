import { NextResponse, NextRequest } from 'next/server';
import { FinhubError, FinhubNewsArticle } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Get the API key from environment variables
  const API_KEY = process.env.FINNHUB_API_KEY;
  const NEWS_CATEGORY = 'general';

  // Check if the API key is configured on the server
  if (!API_KEY) {
    console.error('Server Error: FINNHUB_API_KEY is not configured.');
    return NextResponse.json(
      { error: 'API key is not configured on the server.' },
      { status: 500 }
    );
  }

  const url = `https://finnhub.io/api/v1/news?category=${NEWS_CATEGORY}&token=${API_KEY}`; // /news?category=general&token=

  try {
    const response = await fetch(url, {
      // Next.js caching strategy: revalidate this data every 1 hour (3600 seconds)
      next: {
        revalidate: 3600,
      },
    });

    // Check if the external API call was successful
    if (!response.ok) {
      // Try to parse the error response from Finnhub
      const errorData: FinhubError = await response.json();
      console.error('Finnhub API Error:', errorData);
      return NextResponse.json(
        {
          error: `Failed to fetch news from external API: ${errorData.error || 'Unknown error'}`,
        },
        { status: response.status } // Forward the status code from Finnhub
      );
    }

    // Parse the successful response
    const data: FinhubNewsArticle[] = await response.json();

    // Return the fetched data with a 200 OK status
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Network or other error fetching news:', error);
    // Handle network errors or cases where response.json() fails
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Something went wrong: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
