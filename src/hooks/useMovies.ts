import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchMovies } from '../services/api'
import type { SearchParams, MovieResponse } from '../types/movie'

export const useMovies = (searchParams: SearchParams = {}) => {
    return useInfiniteQuery<MovieResponse, Error>({
        queryKey: ['movies', searchParams],
        queryFn: ({ pageParam = 1 }) =>
            fetchMovies({ ...searchParams, page: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
        staleTime: 5 * 60 * 1000,
        retry: 3,
    })
}