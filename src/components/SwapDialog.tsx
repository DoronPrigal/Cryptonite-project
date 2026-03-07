import { useAppDispatch, useAppSelector, selectSelectedIds, selectAllCoins } from "../store/hooks";
import { swapCoin } from "../store/selectedCoinsSlice";

interface Props {
  newCoinId: string;  // המטבע שהמשתמש רוצה להוסיף
  onClose: () => void;
}

// דיאלוג לבחירת איזה מטבע להחליף כשכבר יש 5 סומנים
function SwapDialog({ newCoinId, onClose }: Props) {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectSelectedIds);
  const allCoins = useAppSelector(selectAllCoins);

  // מציאת פרטי המטבעות הסומנים
  const selectedCoins = selectedIds.map(
    (id) => allCoins.find((c) => c.id === id)!
  ).filter(Boolean);

  // החלפת מטבע נבחר בחדש
  function handleSwap(removeId: string) {
    dispatch(swapCoin({ removeId, addId: newCoinId }));
    onClose();
  }

  // סגירה בלחיצה על הרקע
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
      <div className="dialog">
        <button className="dialog-close" onClick={onClose}>✕</button>
        <h2 className="dialog-title">Replace a Coin</h2>
        <p className="dialog-subtitle">
          You've reached the 5-coin limit. Choose which coin to replace:
        </p>

        <ul className="swap-list">
          {selectedCoins.map((coin) => (
            <li key={coin.id} className="swap-item">
              <img src={coin.image} alt={coin.name} className="swap-coin-image" />
              <span className="swap-coin-name">{coin.name}</span>
              <button className="btn-swap" onClick={() => handleSwap(coin.id)}>
                Replace
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SwapDialog;
