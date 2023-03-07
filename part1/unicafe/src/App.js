import {useState} from 'react'

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad

  if(total == 0) return <p>No feedback provided.</p>
  
  return (
    <table>
      <tbody>
        <StatisticLine statisticName='good' statistic={good} />
        <StatisticLine statisticName='neutral' statistic={neutral} />
        <StatisticLine statisticName='bad' statistic={bad} />
        <StatisticLine statisticName='total' statistic={total} />
        <StatisticLine statisticName='average' statistic={((good-bad) / total).toFixed(2)} />
        <StatisticLine statisticName='positive' statistic={(good / total).toFixed(2).toString().concat('%')} />
      </tbody>
    </table>
  )
}

const Button = ({value, setValue, text}) => <button onClick={() => setValue(value + 1)}>{text}</button>

const StatisticLine = ({statisticName, statistic}) => <tr><td>{statisticName}</td><td>{statistic}</td></tr>

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Provide Feedback</h1>
      <Button value={good} setValue={setGood} text='good' />
      <Button value={neutral} setValue={setNeutral} text='neutral' />
      <Button value={bad} setValue={setBad} text='bad' />
      <h2>Survey Responses</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App