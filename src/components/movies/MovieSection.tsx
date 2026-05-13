import MovieCard from "./MovieCard";

interface Movie {
    id: number
    title: string
    poster_path: string
    vote_average: number
    release_date: string
}

interface MovieSectionProps {
    title: string
    movies: Movie[]
}

function MovieSection({ title, movies }: MovieSectionProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2x1 font-bold text-foreground mb-6">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 x1:grid-cols-6 gap-4">
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        voteAverage={movie.vote_average}
                        releaseDate={movie.release_date}
                    />
                ))}
            </div>
        </section>
    )
}

export default MovieSection