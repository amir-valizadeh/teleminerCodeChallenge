import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGenres } from '../hooks/useGenres'
import type { Movie } from '../types/movie'
import Image from '../assets/img.png'

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const { data: genres } = useGenres()

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : Image;

    const movieGenres = movie.genre_ids
            ?.map(id => genres?.find(genre => genre.id === id)?.name)
            .slice(0, 2)
        || [];
    return (
        <Link to={`/movie/${movie.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 relative group"
            >
                <div className="aspect-[2/3] relative">
                    <img
                        src={posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />

                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        vote average : {movie.vote_average.toFixed(1)}
                    </div>

                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    </div>

                    <div className="absolute bottom-2 right-2 bg-blue-500/80 text-white px-2 py-1 rounded-full text-xs">
                        popularity : {movie.popularity.toFixed(0)}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {movie.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {movie.overview}
                    </p>

                    {movieGenres.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            {movieGenres.map((genre) => (
                                <span
                                    key={genre}
                                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                >
                  {genre}
                </span>
                            ))}
                        </div>
                    )}

                    {/* Release date and vote count */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {new Date(movie.release_date).toLocaleDateString()}
            </span>
                        <span className="flex items-center gap-1">

                          vote count :  {movie.vote_count}
            </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};