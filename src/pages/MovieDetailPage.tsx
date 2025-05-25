import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Star, Users } from 'lucide-react'
import { useMovieDetail, useSimilarMovies } from '../hooks/useMovieDetail'
import { MovieDetailSkeleton } from '../components/MovieDetailSkeleton'
import { MovieCard } from '../components/MovieCard'
import Image from '../assets/img.png'
import {useEffect} from "react";

export const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const { data: movie, isLoading, error } = useMovieDetail(id!)
    const { data: similarMovies } = useSimilarMovies(id!)

    useEffect(() => {
        setTimeout(()=>window.scrollTo({
            top: 0,
            behavior: "smooth",
        }),0)
    },[])
    if (isLoading) return <MovieDetailSkeleton />
    if (error || !movie) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Movie not found</h1>
                    <Link to="/" className="text-blue-600 hover:text-blue-800">
                        ← Back to movies
                    </Link>
                </div>
            </div>
        )
    }

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : Image

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null

    return (
        <div className="min-h-screen bg-gray-100">
            {backdropUrl && (
                <div
                    className="h-96 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${backdropUrl})` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute bottom-4 left-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to movies
                        </Link>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                {!backdropUrl && (
                    <div className="mb-6">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to movies
                        </Link>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    {/* Poster */}
                    <div className="p-6">
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <h1 className="text-4xl font-bold text-gray-900">{movie.title}</h1>
                        </div>

                        {movie.tagline && (
                            <p className="text-lg text-gray-600 italic mb-4">"{movie.tagline}"</p>
                        )}

                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Star className="text-yellow-500" size={20} />
                                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                                <span>({movie.vote_count} votes)</span>
                            </div>

                            {movie.runtime && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock size={20} />
                                    <span>{movie.runtime} min</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar size={20} />
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>
                        </div>

                        {movie.genres && movie.genres.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                        >
                      {genre.name}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Overview */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Overview</h3>
                            <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
                        </div>

                        {/* Additional info */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-semibold">Status:</span> {movie.status}
                            </div>
                            <div>
                                <span className="font-semibold">Language:</span> {movie.original_language.toUpperCase()}
                            </div>
                            {movie.budget > 0 && (
                                <div>
                                    <span className="font-semibold">Budget:</span> ${movie.budget.toLocaleString()}
                                </div>
                            )}
                            {movie.revenue > 0 && (
                                <div>
                                    <span className="font-semibold">Revenue:</span> ${movie.revenue.toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {movie.credits?.cast && movie.credits.cast.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-12 bg-white rounded-lg shadow-lg p-6"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Users size={24} />
                            Cast
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {movie.credits.cast.slice(0, 12).map((actor) => (
                                <div key={actor.id} className="text-center">
                                    <img
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                : Image
                                        }
                                        alt={actor.name}
                                        className="w-full aspect-square object-cover rounded-lg mb-2"
                                    />
                                    <h4 className="font-semibold text-sm">{actor.name}</h4>
                                    <p className="text-xs text-gray-600">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {similarMovies?.results && similarMovies.results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12"
                    >
                        <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {similarMovies.results.slice(0, 10).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}