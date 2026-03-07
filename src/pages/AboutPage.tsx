// דף אודות – תיאור הפרויקט ופרטים אישיים
import profilePhoto from "../assets/profile.jpg";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="page-title">About Cryptonite</h1>

        {/* תיאור הפרויקט */}
        <section className="about-section">
          <h2>Project Overview</h2>
          <p>
            Cryptonite is a real-time cryptocurrency tracking dashboard built with
            React, TypeScript, and Redux Toolkit. It displays the top 100 coins
            from CoinGecko, lets you track up to 5 coins simultaneously with live
            price charts, and provides AI-powered investment recommendations via
            ChatGPT.
          </p>
        </section>

        {/* טכנולוגיות */}
        <section className="about-section">
          <h2>Tech Stack</h2>
          <ul className="tech-list">
            <li>React 18 + TypeScript</li>
            <li>Vite (build tool)</li>
            <li>Redux Toolkit (state management)</li>
            <li>React Router v6 (navigation)</li>
            <li>Recharts (live charts)</li>
            <li>CoinGecko API (coin data)</li>
            <li>CryptoCompare API (live prices)</li>
            <li>OpenAI ChatGPT API (recommendations)</li>
          </ul>
        </section>

        {/* פרטים אישיים */}
        <section className="about-section about-developer">
          <div className="developer-info">
            <img
              src={profilePhoto}
              alt="Developer"
              className="developer-photo"
            />
            <div>
              <h2>The Developer</h2>
              <p className="developer-name">Doron Prigal</p>
              <p>Full Stack Web Developer</p>
              <p>John Bryce Bootcamp – 2026</p>
              <div className="developer-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="dev-link">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="dev-link">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
