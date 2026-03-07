import { useEffect, useRef, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { useAppSelector, selectSelectedIds, selectAllCoins } from "../store/hooks";
import { fetchPrices } from "../services/cryptocompare";
import type { ChartPoint } from "../types";

// צבעים לקווי הגרף
const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"];

// דף גרף מחירים בזמן אמת (מתעדכן כל שנייה)
function ReportsPage() {
  const selectedIds = useAppSelector(selectSelectedIds);
  const allCoins = useAppSelector(selectAllCoins);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // מציאת סמלי המטבעות הסומנים
  const selectedCoins = selectedIds
    .map((id) => allCoins.find((c) => c.id === id))
    .filter(Boolean) as typeof allCoins;

  const symbols = selectedCoins.map((c) => c.symbol);

  // עצירת הinterval בניקוי
  useEffect(() => {
    if (symbols.length === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // פונקציה לשליפת מחיר ועדכון הגרף
    async function tick() {
      try {
        const prices = await fetchPrices(symbols);
        const now = new Date().toLocaleTimeString();

        // בניית נקודת זמן חדשה לגרף
        const point: ChartPoint = { time: now };
        symbols.forEach((sym) => {
          const key = sym.toUpperCase();
          point[sym] = prices[key]?.USD ?? 0;
        });

        // שמירת עד 60 נקודות אחרונות
        setChartData((prev) => [...prev.slice(-59), point]);
        setError(null);
      } catch {
        setError("Failed to fetch live prices.");
      }
    }

    tick(); // קריאה ראשונה מיידית
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedIds.join(",")]); // eslint-disable-line

  return (
    <div className="reports-page">
      <h1 className="page-title">Live Price Reports</h1>

      {/* אם אין מטבעות סומנים */}
      {selectedIds.length === 0 && (
        <div className="empty-state">
          <p>No coins selected. Go to the Home page and toggle coins to track them.</p>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      {/* גרף קווי */}
      {selectedIds.length > 0 && chartData.length > 0 && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                labelStyle={{ color: "#f8fafc" }}
              />
              <Legend />
              {symbols.map((sym, i) => (
                <Line
                  key={sym}
                  type="monotone"
                  dataKey={sym}
                  stroke={COLORS[i % COLORS.length]}
                  dot={false}
                  strokeWidth={2}
                  name={sym.toUpperCase()}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* רשימת מטבעות מסומנים */}
      {selectedCoins.length > 0 && (
        <div className="selected-coins-list">
          {selectedCoins.map((coin, i) => (
            <div key={coin.id} className="selected-coin-badge" style={{ borderColor: COLORS[i % COLORS.length] }}>
              <img src={coin.image} alt={coin.name} className="badge-image" />
              <span>{coin.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportsPage;
