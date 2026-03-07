import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector, selectFilteredCoins, selectLoading, selectError } from "../store/hooks";
import { setCoins, setLoading, setError } from "../store/coinsSlice";
import { fetchCoins } from "../services/coingecko";
import CoinCard from "../components/CoinCard";

// דף הבית – 100 כרטיסיות מטבעות עם חיפוש וparallax
function HomePage() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectFilteredCoins);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const headerRef = useRef<HTMLElement>(null);

  // שליפת המטבעות בטעינה ראשונה בלבד
  useEffect(() => {
    async function load() {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const data = await fetchCoins();
        dispatch(setCoins(data));
      } catch (err) {
        dispatch(setError("Failed to load coins. Please try again."));
      } finally {
        dispatch(setLoading(false));
      }
    }
    load();
  }, [dispatch]);

  // אפקט Parallax אמיתי – תמונת הרקע נעה לאט יותר מהגלילה
  useEffect(() => {
    function handleScroll() {
      if (!headerRef.current) return;
      // קצב תזוזה: 0.4 = תמונה נעה 40% ממהירות הגלילה
      const offset = window.scrollY * 0.4;
      headerRef.current.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* כותרת ראשית עם parallax effect */}
      <header className="parallax-header" ref={headerRef}>
        <div className="parallax-content">
          <h1 className="parallax-title">Cryptonite</h1>
          <p className="parallax-subtitle">Track the world's top 100 cryptocurrencies</p>
        </div>
      </header>

      <main className="home-main">
        {/* מצב טעינה */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading coins...</p>
          </div>
        )}

        {/* מצב שגיאה */}
        {error && !loading && (
          <div className="error-container">
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* גריד כרטיסיות */}
        {!loading && !error && (
          <>
            <p className="coins-count">{coins.length} coins found</p>
            <div className="coins-grid">
              {coins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;
