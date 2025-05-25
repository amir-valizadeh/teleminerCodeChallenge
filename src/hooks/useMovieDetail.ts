import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetail, fetchSimilarMovies } from '../services/api'

export const useMovieDetail = (movieId: string) => {
    return useQuery({
        queryKey: ['movie', movieId],
        queryFn: () => fetchMovieDetail(movieId),
        enabled: !!movieId,
        staleTime: 10 * 60 * 1000,
    })
}

export const useSimilarMovies = (movieId: string) => {
    return useQuery({
        queryKey: ['similarMovies', movieId],
        queryFn: () => fetchSimilarMovies(movieId),
        enabled: !!movieId,
        staleTime: 10 * 60 * 1000,
    })
}