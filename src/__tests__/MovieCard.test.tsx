import { render, screen } from '../test-utils';
import { describe, it, expect } from 'vitest';
import { MovieCard } from '../components/MovieCard';
import Image from '../assets/img.png';

const mockMovie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test Overview',
    poster_path: '/test.jpg',
    release_date: '2024-01-01',
    popularity: 7.8,
    vote_average: 8.5,
    vote_count: 100,
    adult: false,
    backdrop_path: null,
    genre_ids: [28],
    original_language: 'en',
    original_title: 'Test Movie',
    video: false
};

describe('MovieCard Component', () => {
    it('renders movie information correctly', () => {
        render(<MovieCard movie={mockMovie} />);

        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('Test Overview')).toBeInTheDocument();
        expect(screen.getByText('7.8')).toBeInTheDocument();
    });

    it('uses fallback image when poster_path is null', () => {
        const movieWithoutPoster = { ...mockMovie, poster_path: null };
        render(<MovieCard movie={movieWithoutPoster} />);

        const img = screen.getByAltText('Test Movie');
        expect(img).toHaveAttribute('src', Image);
    });

    it('formats release date correctly', () => {
        render(<MovieCard movie={mockMovie} />);

        const formattedDate = new Date('2024-01-01').toLocaleDateString();
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('truncates long overview text', () => {
        const longOverview = 'a'.repeat(200);
        const movieWithLongOverview = { ...mockMovie, overview: longOverview };

        render(<MovieCard movie={movieWithLongOverview} />);

        const overview = screen.getByText(/a+/);
        expect(overview.textContent?.length).toBeLessThan(longOverview.length);
    });
});