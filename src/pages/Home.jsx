import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';
import './Home.css';

export default function Home() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = 'gtnntg';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'en' ? 'Digital Identity of gtnntg' : 'Цифровая личность gtnntg');
    }
  }, [language]);

  return (
    <div className="home">
      <Header />
      <main className="home-main">
        <h1 className="home-title gradient-text">{t('home.title')}</h1>
        <p className="home-subtitle">{t('home.subtitle')}</p>
        <div className="home-links">
          <Link to="/digitalcard/gtnntg" className="home-link-btn">
            {t('home.goToCard')}
          </Link>
          <Link to="/digitalcard" className="home-link-btn secondary">
            {t('home.goToHub')}
          </Link>
        </div>
      </main>
    </div>
  );
}
