import { create } from 'zustand'
import type { Movie } from '../types/movie'

interface MovieStore {
    movies: Movie[]
    searchQuery: string
    selectedGenre: string
    currentPage: number
    hasNextPage: boolean
    isLoading: boolean
    error: string | null

    setMovies: (movies: Movie[]) => void
    addMovies: (movies: Movie[]) => void
    setSearchQuery: (query: string) => void
    setSelectedGenre: (genre: string) => void
    setCurrentPage: (page: number) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    setHasNextPage: (hasNext: boolean) => void
    resetMovies: () => void
    reset: () => void
}

export const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    searchQuery: '',
    selectedGenre: '',
    currentPage: 1,
    hasNextPage: true,
    isLoading: false,
    error: null,

    setMovies: (movies) => set({ movies }),
    addMovies: (newMovies) => set((state) => ({
        movies: [...state.movies, ...newMovies]
    })),
    setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
    setSelectedGenre: (selectedGenre) => set({ selectedGenre, currentPage: 1 }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setHasNextPage: (hasNextPage) => set({ hasNextPage }),
    resetMovies: () => set({ movies: [], currentPage: 1, hasNextPage: true }),
    reset: () => set({
        movies: [],
        searchQuery: '',
        selectedGenre: '',
        currentPage: 1,
        hasNextPage: true,
        isLoading: false,
        error: null,
    }),
}))
