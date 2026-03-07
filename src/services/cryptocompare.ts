import type { PriceMap } from "../types";

const BASE = "https://min-api.cryptocompare.com/data/pricemulti";

// שליפת מחירים בזמן אמת - קריאה אחת לכל המטבעות הסומנים
export async function fetchPrices(symbols: string[]): Promise<PriceMap> {
  if (symbols.length === 0) return {};
  const fsyms = symbols.join(",").toUpperCase();
  const res = await fetch(`${BASE}?fsyms=${fsyms}&tsyms=USD`);
  if (!res.ok) throw new Error(`CryptoCompare error: ${res.status}`);
  return res.json();
}
