import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MoviesState {
  popular: Movie[];
  nowPlaying: Movie[];
  topRated: Movie[];
  loading: boolean;
  error: string | null;
}

function useMovies() {
  const [state, setState] = useState<MoviesState>({
    popular: [],
    nowPlaying: [],
    topRated: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularRes, nowPlayingRes, topRatedRes] = await Promise.all([
          fetch("http://localhost:3000/movies/popular"),
          fetch("http://localhost:3000/movies/now-playing"),
          fetch("http://localhost:3000/movies/top-rated"),
        ]);

        const [popular, nowPlaying, topRated] = await Promise.all([
          popularRes.json(),
          nowPlayingRes.json(),
          topRatedRes.json(),
        ]);

        setState({
          popular: popular.results,
          nowPlaying: nowPlaying.results,
          topRated: topRated.results,
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
