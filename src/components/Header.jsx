import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <div className="text-sm font-medium gradient-text">gtnntg.com</div>
        <div className="flex gap-2">
          <button
            onClick={toggleLanguage}
            className="btn btn-secondary"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'RU' : 'EN'}
          </button>
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
