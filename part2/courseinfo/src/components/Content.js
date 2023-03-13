import Part from './Part'

const Content = ({parts}) => {
    const partComponents = parts.map(part => (
      <Part key={part.name} name={part.name} exercises={part.exercises} />
    ))
  
    return (
      <div>
        {partComponents}
      </div>
    )
}

export default Content