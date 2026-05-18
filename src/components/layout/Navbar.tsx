import { Link } from "react-router-dom";
import SearchBar from "@/components/search/SearchBar";

function Navbar() {
  return (
    <nav className="w-full bg-background border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex w-[60%] mx-auto justify-between items-center">
        <Link to="/" className="text-x1 font-bold text-foreground">
          🎬 Movie Library
        </Link>
        <SearchBar />
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/recently-released"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Recently Rleased
          </Link>
          <Link
            to="/popular"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Popular
          </Link>
          <Link
            to="/top-rated"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Top Rated
          </Link>
          <Link
            to="/in-theaters"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            In Theaters
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
