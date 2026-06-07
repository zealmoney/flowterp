export function analyzeFlowPreferences(flows = []) {
  const stateCount = {};
  const effectCount = {};
  const timeCount = {};

  flows.forEach((flow) => {
    const f = flow.filters_json || {};

    if (f.state) stateCount[f.state] = (stateCount[f.state] || 0) + 1;
    if (f.effect) effectCount[f.effect] = (effectCount[f.effect] || 0) + 1;
    if (f.time_of_day) timeCount[f.time_of_day] = (timeCount[f.time_of_day] || 0) + 1;
  });

  const getTop = (obj) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

  return {
    topState: getTop(stateCount),
    topEffect: getTop(effectCount),
    topTime: getTop(timeCount),
  };
}