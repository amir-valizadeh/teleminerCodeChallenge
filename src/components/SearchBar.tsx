import { useState, useEffect } from 'react'
import { useMovieStore } from '../stores/movieStore'
import { useDebounce } from '../hooks/useDebounce'

export const SearchBar = () => {
    const [localQuery, setLocalQuery] = useState('')
    const { setSearchQuery, resetMovies } = useMovieStore()
    const debouncedQuery = useDebounce(localQuery, 500)

    useEffect(() => {
        setSearchQuery(debouncedQuery)
        resetMovies()
    }, [debouncedQuery, setSearchQuery, resetMovies])

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search movies..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    )
}