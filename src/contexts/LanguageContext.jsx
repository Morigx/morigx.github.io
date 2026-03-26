import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    home: {
      title: 'gtnntg',
      subtitle: 'Digital Identity',
      goToCard: 'My Digital Card',
      goToHub: 'Digital Cards Hub'
    },
    hub: {
      title: 'Digital Cards Hub',
      description: 'Select a digital card to view',
      cards: {
        gtnntg: 'gtnntg - Personal Space'
      }
    },
    card: {
      title: 'Digital Card',
      status: 'Status',
      loading: 'Loading...',
      unknown: 'Unknown',
      links: 'Links',
      noLinks: 'No links available',
      defaultTitle: 'gtnntg - Digital Card',
      defaultDescription: 'Personal digital space of gtnntg'
    },
    common: {
      toggleTheme: 'Toggle Theme',
      toggleLanguage: 'Switch Language'
    }
  },
  ru: {
    home: {
      title: 'gtnntg',
      subtitle: 'Цифровая личность',
      goToCard: 'Моя цифровая карточка',
      goToHub: 'Хаб цифровых карточек'
    },
    hub: {
      title: 'Хаб цифровых карточек',
      description: 'Выберите цифровую карточку для просмотра',
      cards: {
        gtnntg: 'gtnntg - Персональное пространство'
      }
    },
    card: {
      title: 'Цифровая карточка',
      status: 'Статус',
      loading: 'Загрузка...',
      unknown: 'Неизвестно',
      links: 'Ссылки',
      noLinks: 'Нет доступных ссылок',
      defaultTitle: 'gtnntg - Цифровая карточка',
      defaultDescription: 'Персональное цифровое пространство gtnntg'
    },
    common: {
      toggleTheme: 'Переключить тему',
      toggleLanguage: 'Переключить язык'
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.includes('en') ? 'en' : 'ru');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ru' ? 'en' : 'ru');
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[language];
    for (const key of keys) {
      value = value?.[key];
    }
    return value || path;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
