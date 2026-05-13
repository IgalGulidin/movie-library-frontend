import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MovieCard from "@/components/movies/MovieCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-8">
        <div className="w-48">
          <MovieCard
            title="The Shawshank Redemption"
            posterPath="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
            voteAverage={8.7}
            releaseDate="1994-09-23"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
