import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight text-white">
          Flow<span className="text-violet-400">Terp</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>
          <Link to="/strains" className="transition hover:text-white">
            Strains
          </Link>
        </nav>
      </div>
    </header>
  );
}