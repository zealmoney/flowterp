import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import SavedSetupsPage from "./pages/SavedSetupsPage";
import SignupPage from "./pages/SignupPage";
import StrainsPage from "./pages/StrainsPage";
import StrainDetailPage from "./pages/StrainDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/layout/Footer";
import { ToastProvider } from "./context/ToastContext";

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_25%)]" />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/strains" element={<StrainsPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-setups"
            element={
              <ProtectedRoute>
                <SavedSetupsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/strains/:slug" element={<StrainDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </ToastProvider>
  );
}