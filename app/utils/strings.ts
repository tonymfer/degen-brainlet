import { commify, shortenNumber } from 'mint.club-v2-sdk';

export function abbreviateAddress(address?: string, length = 4): string {
  if (!address) return '';
  const start = address.substring(0, length);
  const end = address.substring(address.length - length);

  const result = start + '...' + end;

  return result;
}

export function customShortenNumber(price: number) {
  return `${
    price * 1000 > 1_000_000
      ? commify(shortenNumber(price * 1000).replace('K', '천'))
      : commify(price * 1000)
  }원`;
}
