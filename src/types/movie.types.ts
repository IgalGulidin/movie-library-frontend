export interface Movie {
    id: number
    title: string
    poster_path: string
    vote_average: number
    release_date: string
    overview: string
    backdrop_path: string
}

export interface TMDBResponse {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export interface MovieDetailType {
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path: string
    release_date: string
    vote_average: number
    vote_count: number
    runtime: number
    genres: { id: number; name: string }[]
    tagline: string
    status: string
}

export interface CastMember {
    id: number
    name: string
    character: string
    profile_path: string | null
}

export interface Video {
    key: string
    name: string
    type: string
    site: string
}

export interface WatchProvider {
    provider_id: number
    provider_name: string
    logo_path: string
}