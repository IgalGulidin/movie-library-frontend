import MovieCard from "./MovieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Movie } from "@/types/movie.types"

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

function MovieSection({ title, movies = [] }: MovieSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2x1 font-bold text-foreground mb-6">{title}</h2>
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
