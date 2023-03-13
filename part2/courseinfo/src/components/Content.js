import Part from './Part'

const Content = ({parts}) => {
    const partComponents = parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))
  
    return (
      <div>
        {partComponents}
      </div>
    )
}

export default Content