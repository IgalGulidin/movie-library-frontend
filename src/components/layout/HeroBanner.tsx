import { Link } from "react-router-dom"
import type { Movie } from "@/types/movie.types"

interface HeroBannerProps {
    movies: Movie[]
}

function HeroBanner({ movies }: HeroBannerProps) {
    if (!movies.length) return null

    const featured = movies[0]
    const backdropUrl = `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
    const year = featured.release_date?.split("-")[0]
    const rating = featured.vote_average.toFixed(1)

    return (
        <div className="relative w-full h-[70vh] mb-8">
            {/* Backdrop Image */}
            <img 
                src={backdropUrl} 
                alt={featured.title}
                className="w-full h-full object-cover"
            />

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-backround via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
                <div className="w-[85%] mx-auto flex flex-col gap-4 max-w-lg">
                    <h1 className="text-5xl font-bold text-foreground leading-tight">
                        {featured.title}
                    </h1>
                    <div className="flex gap-3 text-sm text-muted-foreground">
                        <span>⭐ {rating}</span>
                        <span>•</span>
                        <span>{year}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {featured.overview}
                    </p>
                    <div className="flex gap-3 mt-2">
                        <Link to={`/movie/${featured.id}`}>
                            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/80 transition-colors">
                                More Info
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroBanner