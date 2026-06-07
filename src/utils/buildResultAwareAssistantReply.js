export function buildResultAwareAssistantReply({
  beforeCount,
  afterCount,
  beforeTop,
  afterTop,
  actionResult,
}) {
  const beforeName = beforeTop?.strain_name || null;
  const afterName = afterTop?.strain_name || null;

  if (beforeCount === afterCount && beforeName === afterName) {
    return "I applied that change, but the top recommendation didn’t shift much yet. You may want to broaden the setup a bit more.";
  }

  if (afterCount > beforeCount && afterName && afterName !== beforeName) {
    return `That opened things up. You now have ${afterCount} matches, and ${afterName} is leading the results.`;
  }

  if (afterCount > beforeCount) {
    return `That broadened the setup. You now have ${afterCount} matches instead of ${beforeCount}.`;
  }

  if (afterName && afterName !== beforeName) {
    return `That changed the ranking. ${afterName} is now your top recommendation.`;
  }

  if (afterCount < beforeCount) {
    return `That narrowed the setup. You now have ${afterCount} matches instead of ${beforeCount}.`;
  }

  if (actionResult?.message) {
    return `${actionResult.message} Your recommendations have been refreshed.`;
  }

  return "I applied that change and refreshed the recommendations.";
}