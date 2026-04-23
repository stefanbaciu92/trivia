import { SOURCES } from '../api/sources'

export default function Results({ score, total, config, onRestart }) {
  const pct = Math.round((score / total) * 100)
  const grade =
    pct >= 90 ? 'Outstanding!' :
    pct >= 70 ? 'Well done!' :
    pct >= 50 ? 'Not bad!' :
    'Better luck next time!'

  return (
    <div className="results">
      <h2>Game Over</h2>
      <div className="score-circle">
        <span className="score-number">{score}</span>
        <span className="score-total">/ {total}</span>
      </div>
      <p className="grade">{grade}</p>
      <p className="pct">{pct}% correct</p>

      <div className="results-meta">
        <span>{SOURCES[config.source]}</span>
        {config.category && <span>{config.category}</span>}
        {config.difficulty && <span className={`badge difficulty-${config.difficulty}`}>{config.difficulty}</span>}
      </div>

      <button className="start-btn" onClick={onRestart}>Play Again</button>
    </div>
  )
}
