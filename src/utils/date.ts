function formatNumber(number: number) {
  return number.toString().padStart(2, "0");
}

/**
 * Format a number representing seconds to a string containing minutes and seconds like "01:40"
 */
export function formatSecondsDuration(seconds: number) {
  seconds = Math.floor(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
}