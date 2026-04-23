import { useState } from 'react'
import { SOURCES, OPENTDB_CATEGORIES, TRIVIAAPI_CATEGORIES } from '../api/sources'

export default function StartScreen({ onStart }) {
  const [source, setSource] = useState('opentdb')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [amount, setAmount] = useState(10)

  const categories = source === 'opentdb' ? OPENTDB_CATEGORIES : TRIVIAAPI_CATEGORIES

  function handleSourceChange(s) {
    setSource(s)
    setCategory('')
  }

  return (
    <div className="start-screen">
      <h1>Trivia</h1>
      <p className="subtitle">Test your knowledge across hundreds of topics</p>

      <div className="config-grid">
        <label>
          Source
          <div className="source-toggle">
            {Object.entries(SOURCES).map(([key, label]) => (
              <button
                key={key}
                className={`toggle-btn ${source === key ? 'active' : ''}`}
                onClick={() => handleSourceChange(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </label>

        <label>
          Category
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>

        <label>
          Difficulty
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Questions
          <div className="amount-row">
            {[5, 10, 15, 20].map(n => (
              <button
                key={n}
                className={`toggle-btn ${amount === n ? 'active' : ''}`}
                onClick={() => setAmount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </label>
      </div>

      <button className="start-btn" onClick={() => onStart({ source, category, difficulty, amount })}>
        Start Game
      </button>
    </div>
  )
}
