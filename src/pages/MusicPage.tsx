import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Track } from '../types/models';
import TrackCard from '../components/TrackCard';

export default function MusicPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const q = query(collection(db, 'tracks'), orderBy('releaseDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const tracksData: Track[] = [];
        querySnapshot.forEach((doc) => {
          tracksData.push({ id: doc.id, ...doc.data() } as Track);
        });
        setTracks(tracksData);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">LATEST TRACKS</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      )}
    </div>
  );
}