export default function SectionGlow({
  children,
  glow = "violet",
  className = "",
}) {
  const glowMap = {
    violet: "bg-violet-500/10",
    blue: "bg-sky-500/10",
    emerald: "bg-emerald-500/10",
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <div
        className={`pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full blur-3xl ${glowMap[glow] || glowMap.violet}`}
      />
      <div
        className={`pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full blur-3xl ${glowMap[glow] || glowMap.violet}`}
      />
      <div className="relative">{children}</div>
    </div>
  );
}