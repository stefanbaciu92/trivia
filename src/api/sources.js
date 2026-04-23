// Open Trivia DB: https://opentdb.com/api_config.php
// The Trivia API: https://the-trivia-api.com/

export const SOURCES = {
  opentdb: 'Open Trivia DB',
  triviaapi: 'The Trivia API',
}

function decodeHtml(str) {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

function shuffle(arr) {
  return arr
    .map(v => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v)
}

export async function fetchQuestions({ source = 'opentdb', amount = 10, category = '', difficulty = '' } = {}) {
  if (source === 'opentdb') {
    const params = new URLSearchParams({ amount: String(amount) })
    if (category) params.set('category', category)
    if (difficulty) params.set('difficulty', difficulty)
    params.set('type', 'multiple')

    const res = await fetch(`https://opentdb.com/api.php?${params}`)
    if (!res.ok) throw new Error('Failed to fetch from Open Trivia DB')
    const data = await res.json()
    if (data.response_code !== 0) throw new Error('Open Trivia DB returned no results')

    return data.results.map(q => ({
      source: 'opentdb',
      question: decodeHtml(q.question),
      correct: decodeHtml(q.correct_answer),
      options: shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHtml)),
      category: decodeHtml(q.category),
      difficulty: q.difficulty,
    }))
  }

  if (source === 'triviaapi') {
    const params = new URLSearchParams({ limit: String(amount) })
    if (difficulty) params.set('difficulty', difficulty)
    if (category) params.set('category', category)

    const res = await fetch(`https://the-trivia-api.com/v2/questions?${params}`)
    if (!res.ok) throw new Error('Failed to fetch from The Trivia API')
    const data = await res.json()

    return data.map(q => ({
      source: 'triviaapi',
      question: q.question.text,
      correct: q.correctAnswer,
      options: shuffle([q.correctAnswer, ...q.incorrectAnswers]),
      category: q.category,
      difficulty: q.difficulty,
    }))
  }

  throw new Error(`Unknown source: ${source}`)
}

export const OPENTDB_CATEGORIES = [
  { id: '', label: 'Any Category' },
  { id: '9', label: 'General Knowledge' },
  { id: '10', label: 'Entertainment: Books' },
  { id: '11', label: 'Entertainment: Film' },
  { id: '12', label: 'Entertainment: Music' },
  { id: '14', label: 'Entertainment: Television' },
  { id: '15', label: 'Entertainment: Video Games' },
  { id: '17', label: 'Science & Nature' },
  { id: '18', label: 'Science: Computers' },
  { id: '19', label: 'Science: Mathematics' },
  { id: '20', label: 'Mythology' },
  { id: '21', label: 'Sports' },
  { id: '22', label: 'Geography' },
  { id: '23', label: 'History' },
  { id: '24', label: 'Politics' },
  { id: '25', label: 'Art' },
  { id: '26', label: 'Celebrities' },
  { id: '27', label: 'Animals' },
  { id: '28', label: 'Vehicles' },
  { id: '30', label: 'Science: Gadgets' },
]

export const TRIVIAAPI_CATEGORIES = [
  { id: '', label: 'Any Category' },
  { id: 'arts_and_literature', label: 'Arts & Literature' },
  { id: 'film_and_tv', label: 'Film & TV' },
  { id: 'food_and_drink', label: 'Food & Drink' },
  { id: 'general_knowledge', label: 'General Knowledge' },
  { id: 'geography', label: 'Geography' },
  { id: 'history', label: 'History' },
  { id: 'music', label: 'Music' },
  { id: 'science', label: 'Science' },
  { id: 'society_and_culture', label: 'Society & Culture' },
  { id: 'sport_and_leisure', label: 'Sport & Leisure' },
]
