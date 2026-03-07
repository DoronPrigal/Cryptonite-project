import { useState } from "react";
import type { Coin } from "../types";
import { useAppDispatch, useAppSelector, selectIsSelected, selectSelectedCount } from "../store/hooks";
import { toggleCoin } from "../store/selectedCoinsSlice";
import CoinInfoDialog from "./CoinInfoDialog";
import SwapDialog from "./SwapDialog";

interface Props {
  coin: Coin;
}

// כרטיסיית מטבע עם תמונה, מחיר, switch לסימון וכפתור More Info
function CoinCard({ coin }: Props) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(selectIsSelected(coin.id));
  const selectedCount = useAppSelector(selectSelectedCount);

  // האם להציג את דיאלוג פרטי המטבע
  const [showInfo, setShowInfo] = useState(false);
  // האם להציג את דיאלוג ההחלפה (כשכבר יש 5 סומנים)
  const [showSwap, setShowSwap] = useState(false);

  // טיפול בלחיצה על ה-switch
  function handleToggle() {
    if (!isSelected && selectedCount >= 5) {
      // כבר יש 5 סומנים - פתח דיאלוג החלפה
      setShowSwap(true);
    } else {
      dispatch(toggleCoin(coin.id));
    }
  }

  // צבע לשינוי % ביממה
  const priceChangeClass = coin.price_change_percentage_24h >= 0 ? "positive" : "negative";

  return (
    <>
      <div className="coin-card">
        <div className="coin-card-header">
          <img src={coin.image} alt={coin.name} className="coin-image" />
          <div className="coin-info">
            <h3 className="coin-name">{coin.name}</h3>
            <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
          </div>
          {/* Switch לסימון */}
          <label className="switch">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="coin-card-body">
          <p className="coin-price">${coin.current_price.toLocaleString()}</p>
          <p className={`coin-change ${priceChangeClass}`}>
            {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </p>
          <p className="coin-rank">Rank #{coin.market_cap_rank}</p>
        </div>

        <button className="btn-more-info" onClick={() => setShowInfo(true)}>
          More Info
        </button>
      </div>

      {/* דיאלוג פרטי מטבע */}
      {showInfo && (
        <CoinInfoDialog coinId={coin.id} coinName={coin.name} onClose={() => setShowInfo(false)} />
      )}

      {/* דיאלוג החלפת מטבע כשמגיעים ל-6 */}
      {showSwap && (
        <SwapDialog newCoinId={coin.id} onClose={() => setShowSwap(false)} />
      )}
    </>
  );
}

export default CoinCard;
