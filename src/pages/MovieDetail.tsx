import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  MovieDetailType,
  CastMember,
  Video,
  WatchProvider,
} from "@/types/movie.types";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [providers, setProviders] = useState<WatchProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchLink, setWatchLink] = useState<string>("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [movieRes, creditsRes, videosRes, providersRes] =
          await Promise.all([
            fetch(`http://localhost:3000/movies/${id}`),
            fetch(`http://localhost:3000/movies/${id}/credits`),
            fetch(`http://localhost:3000/movies/${id}/videos`),
            fetch(`http://localhost:3000/movies/${id}/providers`),
          ]);

        const [movieData, creditsData, videosData, providersData] =
          await Promise.all([
            movieRes.json(),
            creditsRes.json(),
            videosRes.json(),
            providersRes.json(),
          ]);

        setMovie(movieData);
        setCast(creditsData.cast?.slice(0, 12) ?? []);

        const officialTrailer = videosData.results?.find(
          (v: Video) => v.type === "Trailer" && v.site === "YouTube",
        );
        setTrailer(officialTrailer ?? null);

        const countryProviders =
          providersData.results?.IL ?? providersData.results?.US ?? null;

        const tmdbLink = countryProviders?.link ?? "https://www.themoviedb.org";
        setWatchLink(tmdbLink);

        setProviders([
          ...(countryProviders?.flatrate ?? []),
          ...(countryProviders?.rent ?? []),
          ...(countryProviders?.buy ?? []),
        ]);
      } catch {
        setError("Failed to fetch movies details");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
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
      <div className="relative w-full h-[55vh]">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="w-[75%] mx-auto pb-16">
        {/* Poster + Info Row */}
        <div className="flex gap-8 -mt-40 relative z-10">
          {/* Poster */}
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-48 rounded-lg shadow-x1 flex-none self-end"
          />

          {/* Info */}
          <div className="flex flex-col gap-3 pb-2 self-end">
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
            <div className="flex gap-3 mt-2">
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/80 transition-colors"
                >
                  ▶ Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mt-8">
          <h2 className="text-x1 font-bold text-foreground mb-2 flex items-center justify-center">
            Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {movie.overview}
          </p>
        </div>

        {/* Where to Watch */}
        {providers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-x1 font-bold text-foreground mb-4 flex items-center justify-center">
              Where to Watch
            </h2>
            <div className="flex gap-4 flex-wrap items-center justify-center">
              {providers.map((provider) => (
                <a
                  key={provider.provider_id}
                  href={watchLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-12 h-12 rounded-lg group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs text-muted-foreground">
                    {provider.provider_name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-8">
            <h2 className="text-x1 font-bold text-foreground mb-4 flex items-center justify-center">
              Cast
            </h2>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {cast.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center gap-1 w-28"
                >
                  <img
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Photo"
                    }
                    alt={member.name}
                    className="w-full h-38 object-cover rounded-lg"
                  />
                  <div className="text-center">
                    <p className="text-xs font-medium text-foreground line-clamp-1">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {member.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
