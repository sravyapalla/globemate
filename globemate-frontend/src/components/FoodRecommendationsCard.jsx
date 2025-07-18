// src/components/FoodRecommendationsCard.jsx
import { useState, useEffect } from 'react';

export default function FoodRecommendationsCard({ city }) {
  const [foods, setFoods] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (!city) return;
    setFoods(null);
    setError(undefined);

    fetch(`/api/ai-foods?city=${encodeURIComponent(city)}`)
      .then(res => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        // Expect data = [{name,shop_name}, …]
        setFoods(data);
      })
      .catch(err => {
        console.error('Could not load food recommendations', err);
        setError('Could not load food recommendations.');
      });
  }, [city]);

  if (error) {
    return <div className="mt-4 text-red-600">{error}</div>;
  }
  if (!foods) {
    return <div className="mt-4">Loading food recommendations…</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Famous Foods in {city}
      </h2>
      {foods.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {foods.map((f, i) => (
            <li key={i} className="text-lg">
              • <strong>{f.name}</strong>
              {f.shop_name && (
                <span className="text-gray-600"> (at {f.shop_name})</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">
          No food recommendations found for {city}.
        </div>
      )}
    </div>
  );
}
