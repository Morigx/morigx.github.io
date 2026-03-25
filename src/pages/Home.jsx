import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const { t, language, toggleLanguage } = useLanguage();
  const { toggleTheme } = useTheme();

  // Динамическое SEO
  useEffect(() => {
    document.title = t('home.title');

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('home.metaDescription'));
    }
  }, [t, language]);

  return (
    <>
      {/* Никнейм в левом верхнем углу */}
      <div className="nickname">gtnntg</div>

      {/* Переключатели темы и языка */}
      <div className="controls">
        <button 
          className="control-btn" 
          onClick={toggleLanguage}
          aria-label="Переключить язык"
        >
          {language === 'ru' ? 'EN' : 'RU'}
        </button>
        <button 
          className="control-btn" 
          onClick={toggleTheme}
          aria-label="Переключить тему"
        >
          {document.documentElement.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Основной контент: кнопка по центру */}
      <div className="main-content">
        <button
          onClick={() => navigate('/digitalcard/gtnntg')}
          className="digital-card-link"
        >
          <span>{t('home.enterButton')}</span>
        </button>
      </div>
    </>
  );
}
