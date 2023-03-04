const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts.map(part => (
    <Part title={part.title} exercises={part.exercises} />
  ))

  return (
    <div>
      {parts}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.title} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercises}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    {title: part1, exercises: exercises1},
    {title: part2, exercises: exercises2},
    {title: part3, exercises: exercises3},
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App