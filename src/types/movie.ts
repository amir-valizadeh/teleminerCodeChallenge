export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
     popularity: number;
    adult: boolean;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    video: boolean;
}

export interface MovieDetail extends Movie {
    genres: Genre[];
    runtime: number;
    budget: number;
    revenue: number;
    status: string;
    tagline: string;
    homepage: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
    credits?: Credits;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

export interface Crew {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
}

export interface Credits {
    cast: Cast[];
    crew: Crew[];
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface GenreResponse {
    genres: Genre[];
}

export interface SearchParams {
    query?: string;
    page?: number;
    genre?: string;
    year?: number;
    sort_by?: string;
}

