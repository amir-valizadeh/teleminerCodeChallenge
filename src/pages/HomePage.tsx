import { SearchBar } from '../components/SearchBar'
import { GenreFilter } from '../components/GenreFilter'
import { InfiniteMovieGrid } from '../components/InfiniteMovieGrid'
import { useMovieStore } from '../stores/movieStore'

export const HomePage = () => {
    const { searchQuery } = useMovieStore()

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">

                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 ">
                            <SearchBar />
                        </div>
                        <div className="flex-shrink-0">
                            <GenreFilter />
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {searchQuery && (
                    <div className="mb-6">
                        <h2 className="text-xl text-gray-700">
                            Search results for: <span className="font-semibold">"{searchQuery}"</span>
                        </h2>
                    </div>
                )}

                <InfiniteMovieGrid />
            </main>
        </div>
    )
}