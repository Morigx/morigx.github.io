import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Динамическое SEO
  useEffect(() => {
    document.title = t('home.title');
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('home.metaDescription'));
    }
  }, [t, language]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Фоновые градиентные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="text-center z-10 animate-fade-in">
        <h1 className="text-7xl md:text-9xl font-bold mb-6 gradient-text tracking-tight">
          gtnntg
        </h1>
        <p className="text-xl md:text-2xl text-secondary mb-12 max-w-md mx-auto leading-relaxed">
          {t('home.description')}
        </p>
        <button
          onClick={() => navigate('/digitalcard/gtnntg')}
          className="btn btn-primary text-lg px-10 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {t('home.enterButton')} →
        </button>
      </div>
    </main>
  );
}
