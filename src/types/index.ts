// טיפוסים מרכזיים לכל הפרויקט

// מטבע בסיסי מה-CoinGecko markets endpoint
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

// נתוני מטבע מפורטים (More Info / AI)
export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: { thumb: string; small: string; large: string };
  description: { en: string };
  market_data: {
    current_price: { usd: number; eur: number; ils: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    high_24h: { usd: number };
    low_24h: { usd: number };
    circulating_supply: number;
    total_supply: number | null;
  };
}

// נתוני מחיר בזמן אמת מ-CryptoCompare
// מפתח = סמל מטבע (גדולות), ערך = מחיר ב-USD
export type PriceMap = Record<string, { USD: number }>;

// פריט ציר זמן לגרף
export interface ChartPoint {
  time: string;  // HH:MM:SS
  [symbol: string]: number | string; // מחיר לכל מטבע
}

// בקשה ל-ChatGPT API
export interface OpenAIRequest {
  model: string;
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  max_tokens: number;
}

// תשובת ChatGPT API
export interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

// סטייט של coins ב-Redux
export interface CoinsState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

// סטייט של selectedCoins ב-Redux
export interface SelectedCoinsState {
  selectedIds: string[];
}
