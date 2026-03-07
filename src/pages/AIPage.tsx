import { useState } from "react";
import { useAppSelector, selectSelectedIds, selectAllCoins } from "../store/hooks";
import { fetchCoinById } from "../services/coingecko";
import { fetchAIRecommendation } from "../services/openai";

// דף המלצות AI למטבעות הסומנים
function AIPage() {
  const selectedIds = useAppSelector(selectSelectedIds);
  const allCoins = useAppSelector(selectAllCoins);

  // מפה: coinId → { loading, result, error }
  const [states, setStates] = useState<
    Record<string, { loading: boolean; result: string | null; error: string | null }>
  >({});

  const selectedCoins = selectedIds
    .map((id) => allCoins.find((c) => c.id === id))
    .filter(Boolean) as typeof allCoins;

  // בקשת המלצה מ-ChatGPT למטבע ספציפי
  async function handleGetRecommendation(coinId: string) {
    setStates((prev) => ({
      ...prev,
      [coinId]: { loading: true, result: null, error: null },
    }));

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;
      if (!apiKey || apiKey === "your_openai_api_key_here") {
        throw new Error("OpenAI API key is not configured in .env file.");
      }

      // שליפת נתוני מטבע מלאים לצורך ה-prompt
      const detail = await fetchCoinById(coinId);
      const recommendation = await fetchAIRecommendation(detail, apiKey);

      setStates((prev) => ({
        ...prev,
        [coinId]: { loading: false, result: recommendation, error: null },
      }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to get recommendation.";
      setStates((prev) => ({
        ...prev,
        [coinId]: { loading: false, result: null, error: msg },
      }));
    }
  }

  return (
    <div className="ai-page">
      <h1 className="page-title">AI Recommendations</h1>
      <p className="page-subtitle">
        Get AI-powered investment insights for your selected coins.
      </p>

      {/* אם אין מטבעות סומנים */}
      {selectedIds.length === 0 && (
        <div className="empty-state">
          <p>No coins selected. Go to the Home page and toggle coins to track them.</p>
        </div>
      )}

      <div className="ai-coins-list">
        {selectedCoins.map((coin) => {
          const state = states[coin.id];
          return (
            <div key={coin.id} className="ai-coin-card">
              <div className="ai-coin-header">
                <img src={coin.image} alt={coin.name} className="ai-coin-image" />
                <div>
                  <h3 className="ai-coin-name">{coin.name}</h3>
                  <span className="ai-coin-symbol">{coin.symbol.toUpperCase()}</span>
                </div>
                <button
                  className="btn-ai"
                  onClick={() => handleGetRecommendation(coin.id)}
                  disabled={state?.loading}
                >
                  {state?.loading ? "Analyzing..." : "Get AI Recommendation"}
                </button>
              </div>

              {/* תוצאת ה-AI */}
              {state?.result && (
                <div className="ai-result">
                  <p>{state.result}</p>
                </div>
              )}

              {/* שגיאה */}
              {state?.error && (
                <p className="error-text">{state.error}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AIPage;
