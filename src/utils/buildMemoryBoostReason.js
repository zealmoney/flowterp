export function buildMemoryBoostReason(item, memory) {
  if (!item || !memory) return null;

  const memoryAdjustment = Number(item.memory_adjustment || 0);
  if (memoryAdjustment <= 0) return null;

  const topEffect = memory.top_effects?.[0];
  const topTerpene = memory.top_terpenes?.[0];
  const topType = memory.top_strain_types?.[0];

  if (topTerpene) {
    return `Aligned with your recent ${String(topTerpene).replace(/-/g, " ")} preferences`;
  }

  if (topEffect) {
    return `Influenced by your recent ${String(topEffect).replace(/-/g, " ")} likes`;
  }

  if (topType) {
    return `Matches your usual ${String(topType).replace(/-/g, " ")} choices`;
  }

  return "Influenced by your recent taste patterns";
}