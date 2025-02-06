import React, { useEffect, useState } from 'react';
import { fetchDogsSearch, fetchDogsByIds } from '../api/dogs.ts';

// Dog interface as provided by the API
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const SearchPage: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDogs = async () => {
      setLoading(true);
      setError(null);
      try {
        // Step 1: Get the search results (dog IDs)
        const searchResults = await fetchDogsSearch({ size: 25 });
        const dogIds: string[] = searchResults.resultIds;

        // Step 2: Get the full dog objects using the IDs
        const dogsData = await fetchDogsByIds(dogIds);
        setDogs(dogsData);
      } catch (err) {
        console.error(err);
        setError('Failed to load dogs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, []);

  // Render states: loading, error, or the list of dogs
  if (loading) return <div>Loading dogs...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="search-page">
      <h1 className="text-8xl m-8 text-center">Available Dogs</h1>
      <ul className="dog-list grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dogs.map((dog) => (
          <li key={dog.id} className="dog-item">
            <img src={dog.img} alt={dog.name} style={{ width: 150 }} />
            <div>
              <strong>{dog.name}</strong>
            </div>
            <div>{dog.breed}</div>
            <div>{dog.age} years old</div>
            <div>ZIP: {dog.zip_code}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchPage;