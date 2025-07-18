// src/App.jsx
import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import CostOfLivingCard from './components/CostOfLivingCard'
import FoodRecommendationsCard from './components/FoodRecommendationsCard'
import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [city, setCity]   = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (!query.trim()) return
    setCity(query.trim())
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">GlobeMate</h1>

      <form onSubmit={onSubmit} className="flex mb-8">
        <input
          type="text"
          placeholder="Enter city"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white border border-gray-300 border-l-0 rounded-r px-6 text-lg"
        >
          Search
        </button>
      </form>

      {city && (
        <>
          <WeatherCard city={city} />
          <CostOfLivingCard city={city} />
          <FoodRecommendationsCard city={city} />
        </>
      )}
    </div>
  )
}
