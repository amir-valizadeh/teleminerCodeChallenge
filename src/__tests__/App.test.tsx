import { render, screen, waitFor } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';
import { fetchMovies } from '../services/api';

vi.mock('../services/api', () => ({
    fetchMovies: vi.fn()
}));

const mockMovieData = {
    page: 1,
    results: [
        {
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
        }
    ],
    total_pages: 10,
    total_results: 100
};

describe('App Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders loading state initially', async () => {
        vi.mocked(fetchMovies).mockResolvedValueOnce(mockMovieData);
        const { container } = render(<App />);

        await waitFor(() => {
            const skeletons = container.getElementsByClassName('animate-pulse');
            expect(skeletons.length).toBe(12);
        });
    });

    it('renders movies after loading', async () => {
        vi.mocked(fetchMovies).mockResolvedValueOnce(mockMovieData);
        render(<App />);

        const movieTitle = await screen.findByText('Test Movie');
        expect(movieTitle).toBeInTheDocument();
    });

    it('handles pagination correctly', async () => {
        const user = userEvent.setup();
        vi.mocked(fetchMovies)
            .mockResolvedValueOnce(mockMovieData)
            .mockResolvedValueOnce({
                ...mockMovieData,
                page: 2
            });

        render(<App />);

        const movieTitle = await screen.findByText('Test Movie');
        expect(movieTitle).toBeInTheDocument();

        const nextButton = screen.getByText('Next');
        await user.click(nextButton);

        expect(fetchMovies).toHaveBeenCalledWith(2);
    });

    it('handles API error', async () => {
        vi.mocked(fetchMovies).mockRejectedValueOnce(new Error('API Error'));
        render(<App />);

        const errorMessage = await screen.findByText('Failed to load movies');
        expect(errorMessage).toBeInTheDocument();
    });
});