import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector, selectSearchQuery } from "../store/hooks";
import { setSearchQuery } from "../store/coinsSlice";

// סרגל ניווט עליון עם קישורים ותיבת חיפוש
function Navbar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">₿</span>
        <span className="navbar-title">Cryptonite</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Reports
        </NavLink>
        <NavLink to="/ai" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          AI Picks
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          About
        </NavLink>
      </div>

      {/* תיבת חיפוש - פועלת רק בדף הבית */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search coins..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="search-input"
        />
      </div>
    </nav>
  );
}

export default Navbar;
