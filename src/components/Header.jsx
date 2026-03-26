import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Header.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="header">
      <div className="header-controls">
        <button 
          onClick={toggleLanguage} 
          className="header-btn"
          aria-label={t('common.toggleLanguage')}
        >
          {language.toUpperCase()}
        </button>
        <button 
          onClick={toggleTheme} 
          className="header-btn"
          aria-label={t('common.toggleTheme')}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
