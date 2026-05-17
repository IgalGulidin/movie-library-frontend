import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useMovies from "./hooks/useMovies";
import MovieSection from "./components/movies/MovieSection";

function App() {
  const { recentlyReleased, popular, inTheaters, topRated, loading, error } = useMovies();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-8">
        <div className="w-[60%] mx-auto">
          <MovieSection title="Recently Released" movies={recentlyReleased} />
          <MovieSection title="Popular" movies={popular} />
          <MovieSection title="Top Rated" movies={topRated} />
          <MovieSection title="In Theaters" movies={inTheaters} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
