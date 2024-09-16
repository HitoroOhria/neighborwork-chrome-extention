export function parseNumber(numStr: string): [number, boolean] {
  const num = Number(numStr);
  return [num, Number.isNaN(num)];
}
