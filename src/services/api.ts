// src/services/api.ts - Enhanced
import type {
    MovieResponse,
    MovieDetail,
    GenreResponse,
    SearchParams
} from '../types/movie';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;

const getAuthHeaders = () => ({
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
});

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
};

// Fetch movies with search and filter capabilities
export const fetchMovies = async (params: SearchParams = {}): Promise<MovieResponse> => {
    const { query, page = 1, genre, year, sort_by = 'popularity.desc' } = params;

    let endpoint: string;
    const queryParams = new URLSearchParams({
        language: 'en-US',
        page: page.toString(),
    });

    if (query) {
        // Search movies
        endpoint = `${API_BASE_URL}/search/movie`;
        queryParams.append('query', query);
    } else {
        // Discover movies
        endpoint = `${API_BASE_URL}/discover/movie`;
        queryParams.append('sort_by', sort_by);

        if (genre) {
            queryParams.append('with_genres', genre);
        }

        if (year) {
            queryParams.append('year', year.toString());
        }
    }

    const response = await fetch(`${endpoint}?${queryParams}`, {
        headers: getAuthHeaders()
    });

    return handleResponse(response);
};

// Fetch single movie details
export const fetchMovieDetail = async (movieId: string): Promise<MovieDetail> => {
    const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}?language=en-US&append_to_response=credits`,
        {
            headers: getAuthHeaders()
        }
    );

    return handleResponse(response);
};

// Fetch movie genres
export const fetchGenres = async (): Promise<GenreResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/genre/movie/list?language=en-US`,
        {
            headers: getAuthHeaders()
        }
    );

    return handleResponse(response);
};

// Fetch popular movies (for homepage)
export const fetchPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/movie/popular?language=en-US&page=${page}`,
        {
            headers: getAuthHeaders()
        }
    );

    return handleResponse(response);
};

// Fetch trending movies
export const fetchTrendingMovies = async (timeWindow: 'day' | 'week' = 'week'): Promise<MovieResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/trending/movie/${timeWindow}?language=en-US`,
        {
            headers: getAuthHeaders()
        }
    );

    return handleResponse(response);
};

// Fetch upcoming movies
export const fetchUpcomingMovies = async (page: number = 1): Promise<MovieResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/movie/upcoming?language=en-US&page=${page}`,
        {
            headers: getAuthHeaders()
        }
    );

    return handleResponse(response);
};

// Fetch similar movies
export const fetchSimilarMovies = async (movieId: string): Promise<MovieResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`,
        {
            headers: getAuthHeaders()
        }
    );

    return handleResponse(response);
};

// Search movies with advanced filters
export const searchMovies = async (
    query: string,
    page: number = 1,
    filters: {
        year?: number;
        genre?: string;
        sort_by?: string;
    } = {}
): Promise<MovieResponse> => {
    return fetchMovies({
        query,
        page,
        ...filters
    });
};