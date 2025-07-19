// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import ShowsPage from './pages/ShowsPage';
import PhotosPage from './pages/PhotosPage';
import ContactPage from './pages/ContactPage';
import Player from './components/Player';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/shows" element={<ShowsPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        <Player />
      </div>
    </AuthProvider>
  );
}

export default App;
