// src/context/PlayerContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { Track } from '../types/models';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  queue: Track[];
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  isPlaying: false,
  playTrack: () => {},
  togglePlay: () => {},
  nextTrack: () => {},
  prevTrack: () => {},
  queue: [],
  addToQueue: () => {},
  clearQueue: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [history, setHistory] = useState<Track[]>([]);

  const playTrack = (track: Track) => {
    if (currentTrack) {
      setHistory([...history, currentTrack]);
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      if (currentTrack) {
        setHistory([...history, currentTrack]);
      }
      const [nextTrack, ...remainingQueue] = queue;
      setCurrentTrack(nextTrack);
      setQueue(remainingQueue);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (history.length > 0) {
      if (currentTrack) {
        setQueue([currentTrack, ...queue]);
      }
      const prevTrack = history[history.length - 1];
      setCurrentTrack(prevTrack);
      setHistory(history.slice(0, -1));
      setIsPlaying(true);
    }
  };

  const addToQueue = (track: Track) => {
    setQueue([...queue, track]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      queue,
      addToQueue,
      clearQueue,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}