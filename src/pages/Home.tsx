import HeroBanner from "@/components/layout/HeroBanner";
import MovieSection from "@/components/movies/MovieSection";
import useMovies from "@/hooks/useMovies";

function Home() {
    const { popular, inTheaters, topRated, recentlyReleased, loading, error } = useMovies()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Loading movies...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-destructive">{error}</p>
            </div>
        )
    }

    return (
        <div>
            <HeroBanner movies={popular} />
            <div className="w-[85%] mx-auto">
                <MovieSection title="Recently Released" movies={recentlyReleased} path="/recently-released" />
                <MovieSection title="In Theaters" movies={inTheaters} path="/in-theaters" />
                <MovieSection title="Popular" movies={popular} path="/popular" />
                <MovieSection title="Top Rated" movies={topRated} path="/top-rated" />
            </div>
        </div>
    )
}

export default Home