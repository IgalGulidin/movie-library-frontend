import MovieSection from "@/components/movies/MovieSection"
import useMovies from "@/hooks/useMovies"

function InTheaters() {
    const { inTheaters, loading, error } = useMovies()

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
        <div className="w-[60%] mx-auto py-8">
            <MovieSection title="In Theaters" movies={inTheaters} />
        </div>
    )
}

export default InTheaters