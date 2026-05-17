function Navbar() {
  return (
    <nav className="w-full bg-background border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex w-[60%] mx-auto justify-between items-center">
        <div className="text-xl font-bold text-foreground">Movie Library</div>
        <div className="flex gap-4">
          <a
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </a>
          <a
            href="/popular"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Popular
          </a>
          <a
            href="/top-rated"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Top Rated
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
