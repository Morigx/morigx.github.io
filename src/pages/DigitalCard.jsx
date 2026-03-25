import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function DigitalCard() {
  const { id } = useParams();
  const { t, language } = useLanguage();

  // Динамическое SEO
  useEffect(() => {
    document.title = `${id} — ${t('home.description')}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${t('digitalcard.loading')} ${id}`);
    }
  }, [id, t, language]);
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Фоновые градиентные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="text-center max-w-lg w-full z-10 animate-fade-in">
        <div className="card-bg rounded-2xl p-8 border border-border-color backdrop-blur-sm shadow-xl">
          {/* Аватар */}
          <div className="w-32 h-32 rounded-full gradient-bg mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
            {id.charAt(0).toUpperCase()}
          </div>
          
          {/* Имя */}
          <h1 className="text-4xl font-bold mb-3 gradient-text tracking-tight">
            {id}
          </h1>
          
          {/* Статус */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></span>
            <p className="text-secondary text-lg">{t('digitalcard.loading')}</p>
          </div>
          
          {/* Разделитель */}
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full mb-6 opacity-70"></div>
          
          {/* Описание заглушки */}
          <div className="text-sm text-secondary space-y-3">
            <p className="leading-relaxed">
              {language === 'en' 
                ? 'This digital card is being prepared for launch.' 
                : 'Эта цифровая карточка готовится к запуску.'}
            </p>
            <p className="leading-relaxed">
              {language === 'en'
                ? 'Soon it will automatically display status, avatar, and links from Google Calendar.'
                : 'Скоро здесь будет автоматически отображаться статус, аватар и ссылки из Google Calendar.'}
            </p>
          </div>
          
          {/* Декоративная кнопка */}
          <button
            disabled
            className="btn btn-primary mt-8 px-8 py-4 rounded-full opacity-60 cursor-not-allowed"
          >
            {language === 'en' ? 'Coming Soon' : 'Скоро'} 🔜
          </button>
        </div>
      </div>
    </main>
  );
}
