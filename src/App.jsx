
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Flower from "./pages/Flower";
import Season from "./pages/Season";
import Gallery from "./pages/Gallery";
import Story from "./pages/Story";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="bloom-app">
      <ScrollToTop />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flower" element={<Flower />} />
          <Route path="/season" element={<Season />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/story" element={<Story />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
