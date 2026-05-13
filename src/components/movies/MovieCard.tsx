interface MovieCardProps {
  title: string;
  posterPath: string;
  voteAverage: number;
  releaseDate: string;
}

function MovieCard({
  title,
  posterPath,
  voteAverage,
  releaseDate,
}: MovieCardProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
  const year = releaseDate.split("-")[0];
  const rating = voteAverage.toFixed(1);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-border bg-card hover:scale-105 transition-transform cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-3 flex flex-col gap-1">
        <h3 className="font-semibold text-sm text-foreground line-clamp-1">
          {title}
        </h3>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{year}</span>
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
