/**
 * Create query string
 * @param searchParams URLSearchParams
 * @param name string
 * @param value string
 * @returns string
 * @example
 * createQueryString(new URLSearchParams('foo=bar'), 'baz', 'qux');
 * // Returns 'foo=bar&baz=qux'
 */

export const createQueryString = (
  searchParams: URLSearchParams,
  name: string,
  value: string
): string => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  return params.toString();
};
