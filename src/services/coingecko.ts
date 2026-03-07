import type { Coin, CoinDetail } from "../types";

const BASE = "https://api.coingecko.com/api/v3";

// בניית headers עם Demo API key אם קיים ב-.env
function getHeaders(): HeadersInit {
  const key = import.meta.env.VITE_COINGECKO_API_KEY as string | undefined;
  return key ? { "x-cg-demo-api-key": key } : {};
}

// שליפת 100 מטבעות מסודרים לפי שווי שוק
export async function fetchCoins(): Promise<Coin[]> {
  const res = await fetch(
    `${BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}

// שליפת נתונים מפורטים למטבע ספציפי (More Info + AI)
export async function fetchCoinById(id: string): Promise<CoinDetail> {
  const res = await fetch(
    `${BASE}/coins/${id}?market_data=true&localization=false&tickers=false&community_data=false&developer_data=false`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}
