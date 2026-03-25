import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hub from './pages/Hub';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/:nickname" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
