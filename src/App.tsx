import Navbar from "./components/ui/layout/Navbar"
import Footer from "./components/ui/layout/Footer"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-8">
        <h1>Movie Library</h1>
      </main>
      <Footer />
    </div>
  )
}

export default App