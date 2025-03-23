import { parseDecimal } from "../parsers/decimal";

export function isValidDecimal(val: string): boolean {
  const str = val.trim();
  if (str.length === 0) return false;

  const number = parseDecimal(str);
  return !isNaN(number);
}
