const Total = ({parts}) => {
    return (
        <p>
            <b>Total of {parts.reduce((exercises, part) => exercises + part.exercises, 0)} exercises</b>
        </p>
    )
}

export default Total