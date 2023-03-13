const Total = (props) => {
    return (
        <p>
            <b>Total of {props.parts.reduce((exercises, part) => exercises + part.exercises, 0)} exercises</b>
        </p>
    )
}

export default Total