import { Link } from 'react-router-dom';
import '../styles/Hub.css';

// Список доступных профилей - можно легко добавлять новые
const profiles = [
  { nickname: 'gtnntg', displayName: 'gtnntg' },
  { nickname: 'gamecop20', displayName: 'gamecop20' },
];

function Hub() {
  return (
    <div className="hub-container">
      <header className="hub-header">
        <h1>Digital Card Hub</h1>
        <p>Select a nickname to view their page:</p>
      </header>
      
      <main className="hub-main">
        <div className="profile-cards">
          {profiles.map((profile) => (
            <Link 
              key={profile.nickname} 
              to={`/${profile.nickname}`} 
              className="profile-card"
            >
              <span className="nickname">{profile.displayName}</span>
            </Link>
          ))}
        </div>
      </main>
      
      <footer className="hub-footer">
        <p>&copy; 2024 Digital Card Hub</p>
      </footer>
    </div>
  );
}

export default Hub;
