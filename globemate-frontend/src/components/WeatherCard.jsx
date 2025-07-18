// src/components/WeatherCard.jsx
import { useState, useEffect } from 'react'

export default function WeatherCard({ city }) {
  const [weather, setWeather] = useState(null)
  const [error, setError]     = useState('')

  useEffect(() => {
    setWeather(null)
    setError('')
    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then(r => r.json())
      .then(json => {
        if (json.error) throw new Error(json.error)
        setWeather(json)
      })
      .catch(err => setError(err.message))
  }, [city])

  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!weather) return <div>Loading…</div>

  return (
    <div>
      <p>{Math.round(weather.temp)}°C</p>
      <p>Humidity: {weather.humidity}%</p>
    </div>
  )
}
