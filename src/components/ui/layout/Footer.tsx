function Footer () {
    return (
        <footer className="w-full border-t border-border px-6 py-8 mt-16">
            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <p>Data provided by</p>
                <div className="flex gap-4">
                    <a 
                    href="https://www.themoviedb.org"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                    >
                        TMDB
                    </a>
                </div>
                <p className="mt-2">Built with React, TypeScript, Node.js, Express and shadcn/ui</p>
            </div>
        </footer>
    )
}

export default Footer;