/**
 * Pluralizes a word based on the count for Ukrainian language.
 *
 * @param count - The number to determine the plural form.
 * @param forms - An array of three forms of the word: [singular, few, many].
 * @returns The correct form of the word based on the count.
 */
export function pluralizeUa(
  count: number,
  forms: [string, string, string]
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return forms[2];
  }

  if (mod10 === 1) {
    return forms[0];
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return forms[1];
  }

  return forms[2];
}
