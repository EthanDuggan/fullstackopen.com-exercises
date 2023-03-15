const AddPersonForm = ({savePerson, handleFormNameChange, handleFormNumberChange, newName, newNumber}) => {

    return (
        <form onSubmit={savePerson}>
            <div>name: <input value={newName} onChange={handleFormNameChange}/></div>
            <div>number: <input value={newNumber} onChange={handleFormNumberChange}/></div>
            <div><button type='submit'>add</button></div>
        </form>
    )
}

export default AddPersonForm