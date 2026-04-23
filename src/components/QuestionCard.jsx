import { useState } from 'react'

export default function QuestionCard({ question, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  function choose(option) {
    if (revealed) return
    setSelected(option)
    setRevealed(true)
  }

  function next() {
    onAnswer(selected === question.correct)
    setSelected(null)
    setRevealed(false)
  }

  function optionClass(option) {
    if (!revealed) return 'option'
    if (option === question.correct) return 'option correct'
    if (option === selected) return 'option wrong'
    return 'option dimmed'
  }

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className="badge">{question.category}</span>
        <span className={`badge difficulty-${question.difficulty}`}>{question.difficulty}</span>
        <span className="progress">{index + 1} / {total}</span>
      </div>

      <p className="question-text">{question.question}</p>

      <div className="options">
        {question.options.map(opt => (
          <button
            key={opt}
            className={optionClass(opt)}
            onClick={() => choose(opt)}
            disabled={revealed}
          >
            {opt}
          </button>
        ))}
      </div>

      {revealed && (
        <div className={`feedback ${selected === question.correct ? 'correct' : 'wrong'}`}>
          {selected === question.correct
            ? 'Correct!'
            : `Wrong — the answer was "${question.correct}"`}
          <button className="next-btn" onClick={next}>
            {index + 1 < total ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}
