// src/components/TrackCard.tsx
import { Track } from '../types/models';
import { usePlayer } from '../context/PlayerContext';

interface TrackCardProps {
  track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
  const { playTrack } = usePlayer();

  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
      onClick={() => playTrack(track)}
    >
      <div className="relative pb-full mb-4">
        <img 
          src={track.coverUrl} 
          alt={track.title} 
          className="absolute h-full w-full object-cover rounded"
        />
      </div>
      <h3 className="font-bold text-lg">{track.title}</h3>
      <p className="text-gray-400">{track.artist}</p>
    </div>
  );
}