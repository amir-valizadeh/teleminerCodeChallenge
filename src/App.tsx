import { useState, useEffect } from 'react';
import { MovieCard } from './components/MovieCard';
import { MovieCardSkeleton } from './components/MovieCardSkeleton';
import { Pagination } from './components/Pagination';
import { fetchMovies } from './services/api';
import type { Movie } from './types/movie';

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchMovies(currentPage);
                setMovies(data.results);
                setTotalPages(Math.min(data.total_pages, 500)); // API limit is 500 pages
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load movies');
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">

            <div className="container mx-auto px-4">
                <div className="flex items-center mb-8 relative">
                    <div className="w-1/3">
                        {!loading && !error && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold">
                        Upcoming Movies
                    </h1>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({length: 12}).map((_, index) => (
                            <MovieCardSkeleton key={index}/>
                        ))
                        : movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                </div>

                {!loading && !error && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}