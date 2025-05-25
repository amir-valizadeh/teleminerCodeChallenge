import { useQuery } from '@tanstack/react-query'
import { fetchGenres } from '../services/api'

export const useGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        staleTime: 60 * 60 * 1000,
        select: (data) => data.genres,
    })
}
