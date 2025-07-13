import { render, screen } from '@testing-library/react';
import { NewsCard } from '../NewsCard';
import { FinhubNewsArticle } from '@/types';

describe('NewsCard Component', () => {
  const mockArticle: FinhubNewsArticle = {
    id: 1,
    thumbnail: '/finhub.jpg',
    source: 'TEST SOURCE',
    date: 1623456000, // 12 June 2021
    title: 'This is a test headline for the news card',
    url: 'https://example.com',
  };

  it('renders the article details correctly', () => {
    render(<NewsCard article={mockArticle} />);

    // Check if the source is rendered
    const sourceElement = screen.getByText('TEST SOURCE');
    expect(sourceElement).toBeInTheDocument();

    // Check if the formatted date is rendered
    const dateElement = screen.getByText('12 June 2021');
    expect(dateElement).toBeInTheDocument();

    // Check if the title is rendered
    const titleElement = screen.getByText(
      'This is a test headline for the news card'
    );
    expect(titleElement).toBeInTheDocument();

    // Check if the image is rendered with the correct alt text
    const imageElement = screen.getByAltText(mockArticle.title);
    expect(imageElement).toBeInTheDocument();

    // Check if the entire card is a link pointing to the correct URL
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', mockArticle.url);
  });
});
