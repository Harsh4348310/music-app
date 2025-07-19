// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="py-6 border-b border-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
          SOLILOQUY
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-gray-400 transition">Home</Link>
          <Link to="/music" className="hover:text-gray-400 transition">Music</Link>
          <Link to="/shows" className="hover:text-gray-400 transition">Shows</Link>
          <Link to="/photos" className="hover:text-gray-400 transition">Photos</Link>
          <Link to="/contact" className="hover:text-gray-400 transition">Contact</Link>
        </div>

        <div>
          {currentUser ? (
            <button className="bg-purple-600 px-4 py-2 rounded-full">
              Profile
            </button>
          ) : (
            <button className="bg-purple-600 px-4 py-2 rounded-full">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}