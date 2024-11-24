import { MovieResponse } from '../types/movie';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (page: number): Promise<MovieResponse> => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    const response = await fetch(
        `${API_BASE_URL}/discover/movie?language=en-US&page=${page}&sort_by=primary_release_date.desc`,
        options
    );

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    return response.json();
};