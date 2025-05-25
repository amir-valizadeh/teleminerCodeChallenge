import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { MovieCard } from './MovieCard'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import { useMovies } from '../hooks/useMovies'
import { useMovieStore } from '../stores/movieStore'

export const InfiniteMovieGrid = () => {
    const { searchQuery, selectedGenre } = useMovieStore()
    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '100px'
    })

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useMovies({
        query: searchQuery || undefined,
        genre: selectedGenre || undefined
    })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

    const movies = data?.pages.flatMap(page => page.results) ?? []

    if (error) {
        return (
            <div className="text-center py-20">
                <div className="text-red-500 text-xl mb-4">
                    Something went wrong!
                </div>
                <p className="text-gray-600">{error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({length: 20}).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (movies.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-gray-500 text-xl mb-4">
                    No movies found
                </div>
                <p className="text-gray-400">
                    {searchQuery ? `Try searching for something else` : 'Try changing your filters'}
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={`${movie.id}-${movie.title}`} movie={movie} />
                ))}
            </div>

            <div ref={ref} className="py-10">
                {isFetchingNextPage && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {Array.from({length: 10}).map((_, i) => (
                            <MovieCardSkeleton key={`skeleton-${i}`} />
                        ))}
                    </div>
                )}
            </div>

            {!hasNextPage && movies.length > 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">You've reached the end!</p>
                </div>
            )}
        </div>
    )
}