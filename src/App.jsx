import { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuestionCard from './components/QuestionCard'
import Results from './components/Results'
import { fetchQuestions } from './api/sources'
import './App.css'

export default function App() {
  const [phase, setPhase] = useState('start') // start | loading | playing | results
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [config, setConfig] = useState({})
  const [error, setError] = useState(null)

  async function handleStart(cfg) {
    setConfig(cfg)
    setError(null)
    setPhase('loading')
    try {
      const qs = await fetchQuestions(cfg)
      setQuestions(qs)
      setCurrent(0)
      setScore(0)
      setPhase('playing')
    } catch (e) {
      setError(e.message)
      setPhase('start')
    }
  }

  function handleAnswer(correct) {
    const newScore = correct ? score + 1 : score
    if (current + 1 >= questions.length) {
      setScore(newScore)
      setPhase('results')
    } else {
      setScore(newScore)
      setCurrent(c => c + 1)
    }
  }

  return (
    <div className="app">
      {phase === 'start' && (
        <>
          {error && <div className="error-banner">{error}</div>}
          <StartScreen onStart={handleStart} />
        </>
      )}

      {phase === 'loading' && (
        <div className="loading">
          <div className="spinner" />
          <p>Loading questions…</p>
        </div>
      )}

      {phase === 'playing' && questions.length > 0 && (
        <QuestionCard
          key={current}
          question={questions[current]}
          index={current}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      )}

      {phase === 'results' && (
        <Results
          score={score}
          total={questions.length}
          config={config}
          onRestart={() => setPhase('start')}
        />
      )}
    </div>
  )
}
