import { useState, useEffect } from "react";
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
          fetch("http://localhost:3000/movies/popular"),
          fetch("http://localhost:3000/movies/in-theaters"),
          fetch("http://localhost:3000/movies/top-rated"),
          fetch("http://localhost:3000/movies/recently-released"),
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
