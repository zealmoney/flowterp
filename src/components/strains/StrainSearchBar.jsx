export default function StrainSearchBar({ value, onChange }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        Search strains
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, flavor, aroma, lineage..."
        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-400"
      />
    </div>
  );
}