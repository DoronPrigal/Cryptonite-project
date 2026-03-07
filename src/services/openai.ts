import type { CoinDetail, OpenAIRequest, OpenAIResponse } from "../types";

const API_URL = "https://api.openai.com/v1/chat/completions";

// שליחת בקשת המלצה ל-ChatGPT עם נתוני המטבע המלאים
export async function fetchAIRecommendation(
  coin: CoinDetail,
  apiKey: string
): Promise<string> {
  // בניית prompt עם הנתונים הרלוונטיים של המטבע
  const prompt = `You are a cryptocurrency analyst. Based on the following data for ${coin.name} (${coin.symbol.toUpperCase()}), give a short investment recommendation (2-3 sentences):

- Current Price: $${coin.market_data.current_price.usd}
- 24h Change: ${coin.market_data.price_change_percentage_24h?.toFixed(2)}%
- 7d Change: ${coin.market_data.price_change_percentage_7d?.toFixed(2)}%
- 30d Change: ${coin.market_data.price_change_percentage_30d?.toFixed(2)}%
- Market Cap: $${coin.market_data.market_cap.usd?.toLocaleString()}
- 24h Volume: $${coin.market_data.total_volume.usd?.toLocaleString()}
- 24h High: $${coin.market_data.high_24h.usd}
- 24h Low: $${coin.market_data.low_24h.usd}
- Circulating Supply: ${coin.market_data.circulating_supply?.toLocaleString()}

Provide a brief, factual recommendation.`;

  const body: OpenAIRequest = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);

  const data: OpenAIResponse = await res.json();
  return data.choices[0].message.content;
}
