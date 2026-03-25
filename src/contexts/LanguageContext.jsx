import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    toggleLanguage: 'Toggle language',
    toggleTheme: 'Toggle theme',
    digitalCard: 'Digital Card',
    home: {
      title: 'gtnntg — Digital Identity',
      description: 'Digital Card',
      metaDescription: 'Personal digital card of gtnntg. Minimalist, stylish, and technologically advanced digital identity.',
      enterButton: 'Enter',
    },
    digitalcard: {
      hubTitle: 'Digital Card Hub',
      selectCard: 'Select a card to view:',
      loading: 'Loading...',
      unknown: 'Unknown',
    },
  },
  ru: {
    toggleLanguage: 'Переключить язык',
    toggleTheme: 'Переключить тему',
    digitalCard: 'Цифровая карточка',
    home: {
      title: 'gtnntg — Цифровая личность',
      description: 'Цифровая карточка',
      metaDescription: 'Персональная цифровая карточка gtnntg. Минималистичный, стильный и технологичный цифровой образ.',
      enterButton: 'Войти',
    },
    digitalcard: {
      hubTitle: 'Хаб цифровых карточек',
      selectCard: 'Выберите карточку:',
      loading: 'Загрузка...',
      unknown: 'Неизвестно',
    },
  },
};

const LanguageContext = createContext();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    if (saved) {
      return saved;
    }
    const browserLang = navigator.language.toLowerCase();
    return browserLang.includes('en') ? 'en' : 'ru';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
