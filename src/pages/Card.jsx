import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useCalendarStatus } from '../hooks/useCalendarStatus';
import { useEffect } from 'react';
import './Card.css';

export default function Card() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { status, loading } = useCalendarStatus();

  useEffect(() => {
    const baseTitle = t('card.defaultTitle');
    const dynamicPart = status.status && status.status !== 'loading' && status.status !== 'unknown' 
      ? ` - ${status.status}` 
      : '';
    document.title = `${baseTitle}${dynamicPart}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const desc = status.status && status.status !== 'loading' && status.status !== 'unknown'
        ? (language === 'en' ? `Current status: ${status.status}` : `Текущий статус: ${status.status}`)
        : t('card.defaultDescription');
      metaDescription.setAttribute('content', desc);
    }
  }, [status, language, t]);

  if (id !== 'gtnntg') {
    return (
      <div className="card">
        <Header />
        <main className="card-main">
          <h1>Card not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="card">
      <Header />
      <main className="card-main">
        <div className="card-container">
          <div className="card-header">
            {status.avatar ? (
              <img src={status.avatar} alt="Avatar" className="card-avatar-img" />
            ) : (
              <div className="card-avatar-placeholder gradient-bg">
                <span>G</span>
              </div>
            )}
            <h1 className="card-title">gtnntg</h1>
          </div>

          <div className="card-content">
            <div className="status-section">
              <h2 className="section-title">{t('card.status')}</h2>
              <div className="status-value">
                {loading ? (
                  <span className="loading">{t('card.loading')}</span>
                ) : status.status === 'unknown' || !status.status ? (
                  <span>{t('card.unknown')}</span>
                ) : (
                  <span className="status-active">{status.status}</span>
                )}
              </div>
            </div>

            {status.links && status.links.length > 0 && (
              <div className="links-section">
                <h2 className="section-title">{t('card.links')}</h2>
                <div className="links-list">
                  {status.links.map((link, index) => (
                    <a 
                      key={index} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-item"
                    >
                      <span className="link-name">{link.name}</span>
                      <span className="link-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
