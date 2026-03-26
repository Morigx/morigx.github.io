import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';
import './Hub.css';

export default function Hub() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = language === 'en' ? 'Digital Cards Hub - gtnntg' : 'Хаб цифровых карточек - gtnntg';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'en' ? 'Select a digital card to view' : 'Выберите цифровую карточку для просмотра');
    }
  }, [language]);

  const cards = [
    {
      id: 'gtnntg',
      name: 'gtnntg',
      description: language === 'en' ? 'Personal Space' : 'Персональное пространство'
    }
  ];

  return (
    <div className="hub">
      <Header />
      <main className="hub-main">
        <h1 className="hub-title gradient-text">{t('hub.title')}</h1>
        <p className="hub-description">{t('hub.description')}</p>
        <div className="cards-grid">
          {cards.map(card => (
            <Link 
              key={card.id} 
              to={`/digitalcard/${card.id}`}
              className="card-item"
            >
              <div className="card-avatar">
                <span>{card.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="card-info">
                <h3 className="card-name">{card.name}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
