import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Show {
  id: string;
  title: string;
  date: string;
  location: string;
  ticketUrl: string;
}

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const q = query(
          collection(db, 'shows'),
          where('date', '>=', new Date().toISOString()),
          orderBy('date', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const showsData: Show[] = [];
        querySnapshot.forEach((doc) => {
          showsData.push({ id: doc.id, ...doc.data() } as Show);
        });
        setShows(showsData);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">UPCOMING SHOWS</h1>
      
      {loading ? (
        <p>Loading shows...</p>
      ) : shows.length > 0 ? (
        <div className="space-y-6">
          {shows.map((show) => (
            <div key={show.id} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold">{show.title}</h2>
              <div className="mt-2 text-gray-400">
                <p>{new Date(show.date).toLocaleDateString()}</p>
                <p>{show.location}</p>
              </div>
              <a 
                href={show.ticketUrl} 
                className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                GET TICKETS
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No upcoming shows scheduled.</p>
      )}
    </div>
  );
}