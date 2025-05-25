import { useGenres } from '../hooks/useGenres'
import { useMovieStore } from '../stores/movieStore'

export const GenreFilter = () => {
    const { selectedGenre, setSelectedGenre, resetMovies } = useMovieStore()
    const { data: genres, isLoading } = useGenres()

    const handleGenreChange = (genreId: string) => {
        setSelectedGenre(genreId)
        resetMovies()
    }

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg w-48"></div>
            </div>
        )
    }

    return (
        <select
            value={selectedGenre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="p-3 py-5  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
            <option value="">All Genres</option>
            {genres?.map(genre => (
                <option key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                </option>
            ))}
        </select>
    )
}
