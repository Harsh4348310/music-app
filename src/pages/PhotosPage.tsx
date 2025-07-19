import { useState, useEffect } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../firebase/config';

export default function PhotosPage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const storageRef = ref(storage, 'gallery/');
        const result = await listAll(storageRef);
        const urls = await Promise.all(
          result.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setPhotos(urls);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">PHOTO GALLERY</h1>
      
      {loading ? (
        <p>Loading photos...</p>
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((url, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <img 
                src={url} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No photos available.</p>
      )}
    </div>
  );
}