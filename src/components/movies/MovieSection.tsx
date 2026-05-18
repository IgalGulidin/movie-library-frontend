import MovieCard from "./MovieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Movie } from "@/types/movie.types";
import { Link } from "react-router-dom";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  path: string;
}

function MovieSection({ title, movies = [], path }: MovieSectionProps) {
  return (
    <section className="mb-12">
      <Link to={path} className="inline-block">
        <h2 className="text-2x1 font-bold text-foreground mb-6">{title}</h2>
      </Link>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-36">
              <MovieCard
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
                releaseDate={movie.release_date}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

export default MovieSection;
