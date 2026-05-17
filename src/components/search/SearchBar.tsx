import { useState } from "react";
import type { Movie } from "@/types/movie.types";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/movies/search?q=${encodeURIComponent(value)}`,
      );
      const data = await response.json();
      setResults(data.results.slice(0, 5));
      setIsOpen(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-88"
      onBlur={() => setTimeout(() => setIsOpen(false), 0)}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search movies..."
        className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {loading && (
        <div className="absolute top-10 left-0 w-full bg-popover border border-border rounded-md p-3 text-sm text-muted-foreground">
          Searching...
        </div>
      )}
      {isOpen && results.length > 0 && (
        <div className="absolute top-10 left-0 w-full bg-popover border border-border overflow-hidden z-50">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer transition-colors"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-8 h-12 object-cover rounded"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground line-clamp-1">
                  {movie.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {movie.release_date?.split("-")[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {isOpen && results.length === 0 && !loading && (
        <div className="absolute top-10 left-0 w-full bg-popover border border-border rounder-md p-3 text-sm text-mutd-foreground">
          No movies found
        </div>
      )}
    </div>
  );
}

export default SearchBar;
