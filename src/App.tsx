import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import AIPage from "./pages/AIPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";

// הגדרת ה-Router עם 4 דפים + Navbar משותף
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
