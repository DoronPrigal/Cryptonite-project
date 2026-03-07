import { useEffect, useState } from "react";
import type { CoinDetail } from "../types";
import { fetchCoinById } from "../services/coingecko";

interface Props {
  coinId: string;
  coinName: string;
  onClose: () => void;
}

// דיאלוג המציג מחיר המטבע ב-USD, EUR ו-ILS
function CoinInfoDialog({ coinId, coinName, onClose }: Props) {
  const [detail, setDetail] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // שליפת נתוני המטבע המפורטים
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchCoinById(coinId);
        setDetail(data);
      } catch (err) {
        setError("Failed to load coin data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [coinId]);

  // סגירה בלחיצה על הרקע
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
      <div className="dialog">
        <button className="dialog-close" onClick={onClose}>✕</button>
        <h2 className="dialog-title">{coinName} – Price Info</h2>

        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {detail && (
          <div className="price-grid">
            <div className="price-item">
              <span className="price-currency">USD</span>
              <span className="price-value">
                ${detail.market_data.current_price.usd.toLocaleString()}
              </span>
            </div>
            <div className="price-item">
              <span className="price-currency">EUR</span>
              <span className="price-value">
                €{detail.market_data.current_price.eur.toLocaleString()}
              </span>
            </div>
            <div className="price-item">
              <span className="price-currency">ILS</span>
              <span className="price-value">
                ₪{detail.market_data.current_price.ils.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoinInfoDialog;
