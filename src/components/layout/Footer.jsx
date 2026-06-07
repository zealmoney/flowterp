import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-t from-black via-zinc-950 to-transparent backdrop-blur">
      <div className="pointer-events-none absolute top-0 left-0 h-[1px] w-full overflow-hidden">
        <div className="h-full w-[200%] animate-[footerGlow_6s_linear_infinite] bg-gradient-to-r from-transparent via-violet-400/60 to-transparent opacity-60" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Flow<span className="text-violet-400">Terp</span>
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Optimize your creative flow with AI-powered strain
              recommendations, terpene intelligence, and personalized sessions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Explore
            </h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-300">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <Link to="/strains" className="transition hover:text-white">
                Strains
              </Link>
              <Link
                to="/recommendations"
                className="transition hover:text-white"
              >
                Recommendations
              </Link>
              <Link to="/saved-setups" className="transition hover:text-white">
                Saved Flows
              </Link>
              <Link to="/about" className="transition hover:text-white">
                About
              </Link>
              <Link to="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Product
            </h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
              <p>AI Co-Pilot Guidance</p>
              <p>Smart Presets</p>
              <p>Personalized Flows</p>
              <p>Mode-Based Recommendations</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} FlowTerp. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-zinc-600">Built for creators</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span className="text-zinc-600">AI-powered</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes footerGlow {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(50%);
          }
        }
      `}</style>
    </footer>
  );
}