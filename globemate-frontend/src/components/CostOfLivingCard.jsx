// src/components/CostOfLivingCard.jsx
import { useState, useEffect } from 'react'

export default function CostOfLivingCard({ city }) {
  const [data,  setData]  = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setData(null)
    setError('')

    fetch(`/api/cost-of-living?city=${encodeURIComponent(city)}`)
      .then(async (res) => {
        const text = await res.text()
        // empty body?
        if (!text) {
          throw new Error(`Empty response (status ${res.status})`)
        }
        let json
        try {
          json = JSON.parse(text)
        } catch (e) {
          console.error('Raw response was:', text)
          throw new Error('Invalid JSON from server')
        }
        if (!res.ok) {
          // pick up your { error: "..." } if you returned one
          throw new Error(json.error || `HTTP ${res.status}`)
        }
        return json
      })
      .then(setData)
      .catch(err => setError(err.message))
  }, [city])

  if (error) return <div className="error">⚠️ {error}</div>
  if (!data)  return <div>Loading cost data…</div>

  return (
    <div className="cost-card">
      <h2>Cost of Living in {city}</h2>
      <ul>
        <li>🏠 Rent + Index: {data.costOfLivingAndRentIndex}</li>
        <li>🛒 Groceries Index: {data.groceriesIndex}</li>
        <li>🍽️ Restaurant Price: {data.restaurantPriceIndex}</li>
        <li>💸 Purchasing Power: {data.localPurchasingPowerIndex}</li>
      </ul>
    </div>
  )
}
