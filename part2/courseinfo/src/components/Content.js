import Part from './Part'

const Content = (props) => {
    const parts = props.parts.map(part => (
      <Part key={part.name} name={part.name} exercises={part.exercises} />
    ))
  
    return (
      <div>
        {parts}
      </div>
    )
}

export default Content