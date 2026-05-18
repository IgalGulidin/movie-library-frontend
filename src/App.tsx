import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home"
import RecentlyReleased from "./pages/RecentlyReleased";
import Popular from "@/pages/Popular"
import TopRated from "./pages/TopRated";
import InTheaters from "./pages/InTheaters";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recently-released" element={<RecentlyReleased />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/in-theaters" element={<InTheaters />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
