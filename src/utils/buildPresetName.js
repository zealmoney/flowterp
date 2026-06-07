function formatLabel(value) {
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function buildPresetName(filters, metadata) {
  const selectedState = metadata?.states?.find(
    (item) => item.slug === filters.state
  );

  const selectedEffect = metadata?.effects?.find(
    (item) => item.slug === filters.effect
  );

  const selectedTime = filters.time_of_day
    ? formatLabel(filters.time_of_day)
    : "";

  if (selectedState && selectedEffect) {
    return `${selectedState.name} · ${selectedEffect.name}`;
  }

  if (selectedState && selectedTime) {
    return `${selectedState.name} · ${selectedTime}`;
  }

  if (selectedState) {
    return selectedState.name;
  }

  return "Custom Preset";
}