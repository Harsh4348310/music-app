// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Track } from '../types/models';
import TrackCard from '../components/TrackCard';

export default function HomePage() {
  const [latestTracks, setLatestTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestTracks = async () => {
      try {
        const q = query(
          collection(db, 'tracks'),
          orderBy('releaseDate', 'desc'),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const tracks: Track[] = [];
        querySnapshot.forEach((doc) => {
          tracks.push({ id: doc.id, ...doc.data() } as Track);
        });
        setLatestTracks(tracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTracks();
  }, []);

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-8">LATEST TRACKS</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="bg-gradient-to-r from-purple-900 to-blue-800 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">New Album | This Fall</h3>
          <button className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold hover:bg-purple-100 transition">
            PRE ORDER NOW
          </button>
        </div>
      </section>
    </div>
  );
}