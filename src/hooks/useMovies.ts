import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import type { Movie, TMDBResponse } from "@/types/movie.types";

interface MoviesState {
  popular: Movie[];
  inTheaters: Movie[];
  topRated: Movie[];
  recentlyReleased: Movie[];
  loading: boolean;
  error: string | null;
}

function useMovies() {
  const [state, setState] = useState<MoviesState>({
    popular: [],
    inTheaters: [],
    topRated: [],
    recentlyReleased: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularRes, inTheatersRes, topRatedRes, recentlyReleasedRes] = await Promise.all([
          fetch(`${API_URL}/movies/popular`),
          fetch(`${API_URL}/movies/in-theaters`),
          fetch(`${API_URL}/movies/top-rated`),
          fetch(`${API_URL}/movies/recently-released`),
        ]);

        const [popular, inTheaters, topRated, recentlyReleased] = await Promise.all([
          popularRes.json() as Promise<TMDBResponse>,
          inTheatersRes.json() as Promise<TMDBResponse>,
          topRatedRes.json() as Promise<TMDBResponse>,
          recentlyReleasedRes.json() as Promise<TMDBResponse>,
        ]);

        setState({
          popular: popular.results,
          inTheaters: inTheaters.results,
          topRated: topRated.results,
          recentlyReleased: recentlyReleased.results,
          loading: false,
          error: null,
        });
      } catch {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch movies",
        }));
      }
    };

    fetchMovies();
  }, []);

  return state;
}

export default useMovies;
