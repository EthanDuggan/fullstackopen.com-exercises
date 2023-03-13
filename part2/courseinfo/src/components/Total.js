const Total = (props) => {
    return (
        <p>
            Number of exercises {props.parts.reduce((exercises, part) => exercises + part.exercises, 0)}
        </p>
    )
}

export default Total