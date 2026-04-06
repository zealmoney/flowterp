import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import StrainsPage from "./pages/StrainsPage";
import StrainDetailPage from "./pages/StrainDetailPage";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_25%)]" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/strains" element={<StrainsPage />} />
        <Route path="/strains/:slug" element={<StrainDetailPage />} />
      </Routes>
    </div>
  );
}