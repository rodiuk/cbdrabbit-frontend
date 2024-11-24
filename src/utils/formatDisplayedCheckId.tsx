/**
 * Formats the check id to be displayed in the UI
 * @param code  The check id
 * @param count The number of digits to display
 * @returns The formatted check id
 * @example
 * formatDisplayedCheckId(123) => "000123"
 */
export const formatDisplayedCheckId = (
  code: string | number,
  count: number = 8
): string => {
  return code?.toString()?.padStart(count, "0");
};
