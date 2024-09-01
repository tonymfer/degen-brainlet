export function abbreviateAddress(address?: string, length = 4): string {
  if (!address) return "";
  const start = address.substring(0, length);
  const end = address.substring(address.length - length);

  const result = start + "..." + end;

  return result;
}
