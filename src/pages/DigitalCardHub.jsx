import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function DigitalCardHub() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const cards = [
    { id: 'gtnntg', name: 'gtnntg' },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          {t('digitalcard.hubTitle')}
        </h1>
        <p className="text-lg text-secondary mb-8">
          {t('digitalcard.selectCard')}
        </p>
        <div className="grid gap-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => navigate(`/digitalcard/${card.id}`)}
              className="btn btn-secondary text-xl py-6 w-full text-center hover:bg-opacity-20"
            >
              {card.name}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
