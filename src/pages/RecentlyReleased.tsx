import MovieSection from "@/components/movies/MovieSection"
import useMovies from "@/hooks/useMovies"

function RecentlyReleased() {
    const { recentlyReleased, loading, error } = useMovies()

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
            <MovieSection title="Recently Released" movies={recentlyReleased} />
        </div>
    )
}

export default RecentlyReleased