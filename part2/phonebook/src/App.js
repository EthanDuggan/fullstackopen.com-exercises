import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleFormNameChange = (event) => setNewName(event.target.value)
  const handleFormNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    //guard clause to make sure newName is unique
    const newNameAlreadyExists = persons.reduce((x, person) => person.name === newName ? true : x, false)
    if(newNameAlreadyExists) {
      alert(`${newName} already exists in the phonebook`)
      return
    }
    
    setPersons(persons.concat({
        name: newName, 
        number: newNumber
    }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleFormNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleFormNumberChange}/></div>
        <div><button type='submit'>add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App