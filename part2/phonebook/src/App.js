import {useState} from 'react'

import AddPersonForm from './components/AddPersonForm'
import Phonebook from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')


  const handleFormNameChange = (event) => setNewName(event.target.value)
  const handleFormNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value)

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
      <h1>Phonebook</h1>
      
      
      <h2>Add a new person</h2>

      <AddPersonForm addPerson={addPerson} handleFormNameChange={handleFormNameChange} handleFormNumberChange={handleFormNumberChange} newName={newName} newNumber={newNumber} />
      
      <h2>Numbers</h2>

      <Phonebook persons={persons} searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange}/>
    </div>
  )
}

export default App