export default function FeaturedStates({ states = [] }) {
  return (
    <section id="featured-states" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Featured Creative States
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Explore the mental modes creators use for coding, editing, music
          production, writing, and design.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {states.map((state) => (
          <div
            key={state.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-white">{state.name}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {state.description}
            </p>
            <p className="mt-4 text-sm text-zinc-300">
              <span className="font-medium text-violet-400">Best for:</span>{" "}
              {state.intended_use}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}