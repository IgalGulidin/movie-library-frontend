import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "@/types/movie.types";

interface HeroBannerProps {
  movies: Movie[];
}

function HeroBanner({ movies }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = movies.slice(0, 10);

  useEffect(() => {
    if (!featured.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [featured.length])

  if (!featured.length) return null

  const movie = featured[currentIndex]
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const year = movie.release_date?.split("-")[0];
  const rating = movie.vote_average.toFixed(1);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % featured.length)
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length)

  return (
    <div className="relative w-full h-[52vh] mb-8 overflow-hidden">
      {/* Backdrop Image */}
      <img
        src={backdropUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-backround via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-[85%] mx-auto flex flex-col gap-4 max-w-lg">
          <h1 className="text-5xl font-bold text-foreground leading-tight">
            {movie.title}
          </h1>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <span>⭐ {rating}</span>
            <span>•</span>
            <span>{year}</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex gap-3 mt-2">
            <Link to={`/movie/${movie.id}`}>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/80 transition-colors">
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10 text-x1 font-bold shadow-lg"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10 text-x1 font-bold shadow-lg"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featured.map((_, index) => (
            <button 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-foreground/30"
                }`}
            />
        ))}
      </div>
    </div>
  );
}

export default HeroBanner;