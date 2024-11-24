import { Movie } from '../types/movie';
import { motion } from 'framer-motion';
import Image from '../assets/img.png'
interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : Image;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true,amount:0.3 }}
            transition={{ duration: 0.3 }}
            whileHover={{scale:1.05,transition:{duration:0.1}}}
            className="bg-white  cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
        >
            <div className="aspect-[2/3] relative">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                    {movie.popularity.toFixed(1)}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{movie.overview}</p>
                <div className="mt-2 text-sm text-gray-500">
                    {new Date(movie.release_date).toLocaleDateString()}
                </div>
            </div>
        </motion.div>
    );
};
