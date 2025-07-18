import { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import CostOfLivingCard from './CostOfLivingCard';

export default function CityDashboard() {
  const [city, setCity]     = useState('');
  const [query, setQuery]   = useState('');
  const [error, setError]   = useState('');

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    setQuery(city.trim());
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={e => setCity(e.target.value)}
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {query && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WeatherCard city={query} />
          <CostOfLivingCard city={query} />
        </div>
      )}
    </div>
  );
}
