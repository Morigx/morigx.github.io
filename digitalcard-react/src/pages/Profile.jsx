import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Profile.css';

// Конфигурация API для разных пользователей
const USER_CONFIGS = {
  gtnntg: {
    profileApiUrl: 'https://sheets.livepolls.app/api/spreadsheets/fc0ed5f8-a649-47c5-a6fa-946f177d998d/main-gtnntg',
    linksApiUrl: 'https://gist.githubusercontent.com/Zeroxel/30d571fe4d15914c5a45ccf9a26255af/raw/links.json',
  },
  gamecop20: {
    profileApiUrl: 'YOUR_API_URL_HERE',
    linksApiUrl: 'YOUR_LINKS_URL_HERE',
  },
};

// Переводы статусов
const STATUS_TRANSLATIONS = {
  ru: {
    "в Сети": "в Сети",
    "Не активен": "Не активен",
    "Не беспокоить": "Не беспокоить",
    "Оффлайн": "Оффлайн",
    "Невидимый": "Невидимый",
  },
  en: {
    "в Сети": "Online",
    "Не активен": "Idle",
    "Не беспокоить": "Do Not Disturb",
    "Оффлайн": "Offline",
    "Невидимый": "Invisible",
  },
};

// Статусы и их цвета
const STATUS_CLASSES = {
  "в Сети": "status-online",
  "Не активен": "status-idle",
  "Не беспокоить": "status-dnd",
  "Оффлайн": "status-offline",
  "Невидимый": "status-invisible",
  "Online": "status-online",
  "Idle": "status-idle",
  "Do Not Disturb": "status-dnd",
  "Offline": "status-offline",
  "Invisible": "status-invisible",
};

function Profile() {
  const { nickname } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [linksData, setLinksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('ru');
  const [theme, setTheme] = useState('dark');

  // Загрузка предпочтений из localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'ru';
    const savedTheme = localStorage.getItem('preferredTheme') || 'dark';
    setLanguage(savedLang);
    setTheme(savedTheme);
  }, []);

  // Применение темы
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
    localStorage.setItem('preferredTheme', theme);
  }, [theme]);

  // Загрузка данных профиля
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = USER_CONFIGS[nickname];
        if (!config) {
          setError('User not found');
          setLoading(false);
          return;
        }

        const response = await fetch(config.profileApiUrl);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setProfileData(data.data[0]);
        } else {
          setError('Failed to load profile');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [nickname]);

  // Загрузка ссылок
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const config = USER_CONFIGS[nickname];
        if (!config || !config.linksApiUrl) {
          return;
        }

        const response = await fetch(config.linksApiUrl);
        const data = await response.json();

        if (Array.isArray(data)) {
          setLinksData(data);
        }
      } catch (err) {
        console.error('Error loading links:', err);
      }
    };

    fetchLinks();
  }, [nickname]);

  // Получение перевода статуса
  const translateStatus = (status) => {
    if (!status) return '';
    return STATUS_TRANSLATIONS[language]?.[status] || status;
  };

  // Получение класса статуса
  const getStatusClass = (status) => {
    return STATUS_CLASSES[status] || 'status-offline';
  };

  // Тексты интерфейса
  const uiText = {
    ru: {
      backToHub: 'Назад к хабу',
      status: 'Статус',
      links: 'Ссылки',
      loading: 'Загрузка...',
      language: 'Русский',
      theme: theme === 'dark' ? 'Темная' : 'Светлая',
    },
    en: {
      backToHub: 'Back to Hub',
      status: 'Status',
      links: 'Links',
      loading: 'Loading...',
      language: 'English',
      theme: theme === 'dark' ? 'Dark' : 'Light',
    },
  };

  const t = uiText[language];

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">{t.loading}</div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="profile-container">
        <Link to="/" className="back-arrow">← {t.backToHub}</Link>
        <div className="error">Error: {error || 'Profile not found'}</div>
      </div>
    );
  }

  return (
    <div className={`profile-container theme-${theme}`}>
      {/* Верхние контролы */}
      <div className="top-controls">
        <Link to="/" className="back-arrow">
          <span>←</span> {t.backToHub}
        </Link>

        {/* Переключатель языка */}
        <div className="selector">
          <button 
            className="selector-button" 
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
          >
            🌐 {language === 'ru' ? 'Русский' : 'English'}
          </button>
        </div>

        {/* Переключатель темы */}
        <div className="selector">
          <button 
            className="selector-button" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '🌙' : '☀️'} {t.theme}
          </button>
        </div>
      </div>

      {/* Карточка профиля */}
      <div className="card">
        {/* Секция профиля */}
        <div className="profile-section">
          <div className="avatar-container">
            <div className="avatar">
              {profileData.avatar ? (
                <img src={profileData.avatar} alt={profileData.username} />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>
            <div className={`online-indicator ${getStatusClass(profileData.onlinestatus)}`} />
          </div>
          <h1>{profileData.username}</h1>
          <div className="status-badge">{translateStatus(profileData.onlinestatus)}</div>
        </div>

        {/* Секция статуса */}
        {profileData.status && profileData.status !== 'none' && (
          <div className="status-section">
            <h2 className="section-title">💬 {t.status}</h2>
            <p className="status-text">{profileData.status}</p>
          </div>
        )}

        {/* Секция ссылок */}
        {linksData.length > 0 && (
          <div className="links-section">
            <h2 className="section-title">🔗 {t.links}</h2>
            <div className="links-grid">
              {linksData.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="link-icon">
                    {link.icon ? (
                      <img src={link.icon} alt={link.name[language] || link.name.en} />
                    ) : (
                      '🔗'
                    )}
                  </div>
                  <span className="link-text">{link.name[language] || link.name.en}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
