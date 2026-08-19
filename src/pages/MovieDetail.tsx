import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetailType } from "@/types/movie.types";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading movie...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const year = movie.release_date?.split("-")[0];
  const rating = movie.vote_average.toFixed(1);
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative w-full h-[50vh]">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="w-[60%] mx-auto -mt-32 relative z-10 pb-16">
        <div className="flex gap-8">
          {/* Poster */}
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-48 rounded-lg shadow-x1 flex-none"
          />

          {/* Info */}
          <div className="flex flex-col gap-3 pt-32">
            <h1 className="text-4x1 font-bold text-foreground">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-muted-foreground italic">"{movie.tagline}"</p>
            )}
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>⭐ {rating}</span>
              <span>{year}</span>
              <span>
                {hours}h {minutes}m
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-foreground/80 leading-relaxed max-w-2x1">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
