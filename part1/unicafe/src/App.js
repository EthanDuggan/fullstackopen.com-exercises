import {useState} from 'react'

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad

  if(total == 0) return <p>No feedback provided.</p>
  
  return (
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>total: {total}</p>
      <p>average: {((good-bad) / total).toFixed(2)}</p>
      <p>percent positive: {(good / total).toFixed(2)}%</p>
    </div>
  )
}

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Provide Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>Survey Responses</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App