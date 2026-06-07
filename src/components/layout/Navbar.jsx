import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useRecentFlows } from "../../hooks/useRecentFlows";

function getDesktopNavLinkClass(isActive) {
  return [
    "group relative text-sm font-medium transition",
    isActive ? "text-white" : "text-zinc-400 hover:text-white",
  ].join(" ");
}

function getMobileNavLinkClass(isActive) {
  return [
    "rounded-2xl px-4 py-3 text-sm font-medium transition",
    isActive
      ? "bg-violet-500/15 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.18)]"
      : "text-zinc-300 hover:bg-white/[0.04] hover:text-white",
  ].join(" ");
}

function buildFlowUrl(flow) {
  const params = new URLSearchParams();

  Object.entries(flow?.filters_json || {}).forEach(([key, value]) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === false
    ) {
      return;
    }

    if (key === "featured") {
      if (value === true) {
        params.set(key, "true");
      }
      return;
    }

    params.set(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `/recommendations?${queryString}` : "/recommendations";
}

function DesktopNavItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => getDesktopNavLinkClass(isActive)}>
      {({ isActive }) => (
        <span className="relative inline-flex flex-col">
          <span>{children}</span>

          <span
            className={[
              "mt-1 h-px w-full origin-left transition duration-300",
              isActive ? "scale-x-100 bg-violet-400" : "scale-x-0 bg-violet-400",
            ].join(" ")}
          />

          <span
            className={[
              "pointer-events-none absolute -bottom-1 left-0 h-4 w-full blur-md transition duration-300",
              isActive ? "opacity-100 bg-violet-500/30" : "opacity-0 bg-violet-500/0",
            ].join(" ")}
          />
        </span>
      )}
    </NavLink>
  );
}

function MobileNavItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => getMobileNavLinkClass(isActive)}>
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { flows: recentFlows } = useRecentFlows();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const latestFlow = recentFlows?.length ? recentFlows[0] : null;

  const continueFlowUrl = useMemo(() => {
    return latestFlow ? buildFlowUrl(latestFlow) : null;
  }, [latestFlow]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-white transition hover:opacity-95"
        >
          Flow<span className="text-violet-400">Terp</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <DesktopNavItem to="/">Home</DesktopNavItem>
          <DesktopNavItem to="/strains">Strains</DesktopNavItem>
          <DesktopNavItem to="/recommendations">Recommendations</DesktopNavItem>
          <DesktopNavItem to="/about">About</DesktopNavItem>
          <DesktopNavItem to="/contact">Contact</DesktopNavItem>

          {continueFlowUrl ? (
            <Link
              to={continueFlowUrl}
              className="rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:border-violet-400/45 hover:bg-violet-500/20 hover:text-white"
            >
              Continue Flow
            </Link>
          ) : null}

          {isAuthenticated ? (
            <>
              <DesktopNavItem to="/saved-setups">Saved</DesktopNavItem>
              <DesktopNavItem to="/profile">Profile</DesktopNavItem>

              <button
                type="button"
                onClick={logout}
                className="text-sm font-medium text-zinc-400 transition hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  [
                    "text-sm font-medium transition",
                    isActive ? "text-white" : "text-zinc-400 hover:text-white",
                  ].join(" ")
                }
              >
                Login
              </NavLink>

              <Link
                to="/signup"
                className="rounded-2xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(139,92,246,0.75)] transition hover:bg-violet-400"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:border-violet-400/30 hover:bg-violet-500/10 md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={[
          "overflow-hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-[760px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
          {continueFlowUrl ? (
            <Link
              to={continueFlowUrl}
              className="mb-1 inline-flex items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-100 transition hover:border-violet-400/45 hover:bg-violet-500/20 hover:text-white"
            >
              Continue Flow
            </Link>
          ) : null}

          <MobileNavItem to="/">Home</MobileNavItem>
          <MobileNavItem to="/strains">Strains</MobileNavItem>
          <MobileNavItem to="/recommendations">Recommendations</MobileNavItem>
          <MobileNavItem to="/about">About</MobileNavItem>
          <MobileNavItem to="/contact">Contact</MobileNavItem>

          {isAuthenticated ? (
            <>
              <MobileNavItem to="/saved-setups">Saved</MobileNavItem>
              <MobileNavItem to="/profile">Profile</MobileNavItem>

              <button
                type="button"
                onClick={logout}
                className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-zinc-300 transition hover:bg-white/[0.04] hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <MobileNavItem to="/login">Login</MobileNavItem>

              <Link
                to="/signup"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(139,92,246,0.75)] transition hover:bg-violet-400"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}