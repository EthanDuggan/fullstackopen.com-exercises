import {useState, useEffect} from 'react'

import phonebookService from './services/phonebook'

import AddPersonForm from './components/AddPersonForm'
import Phonebook from './components/Phonebook'
import Notification from './components/Notification'

const App = () => {

  //define state
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  //initialize persons array with data from server
  useEffect(() => {
    phonebookService.getAllPersons()
      .then(allPersons => setPersons(allPersons))
  }, [])

  //define utility funcitons
  const showNotification = (message, duration) => {
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(null), duration)
  }

  //define various event handlers
  const handleFormNameChange = event => setNewName(event.target.value)
  const handleFormNumberChange = event => setNewNumber(event.target.value)
  const handleSearchQueryChange = event => setSearchQuery(event.target.value)

  const savePerson = event => {
    event.preventDefault()

    const newPersonObject = {
      name: newName, 
      number: newNumber
    }

    //guard clause to see if the name already exists in the phonebook, if it does, update the contact
    const existingPerson = persons.reduce((x, p) => p.name === newName ? p : x, null)
    if(existingPerson !== null) {
      if(window.confirm(`${newName} already exists in the phonebook, update their number?`)){
        phonebookService.updatePerson(existingPerson.id, newPersonObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
          })
      }
      return
    }

    //if passed previous guard clause, then this is a new contact and we add them accordingly
    phonebookService.addPerson(newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`, 5000)
      })
  }

  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name} form your phonebook?`)){
      phonebookService.deletePerson(person.id)
      .then(() => setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      
      <Notification message={notificationMessage} />
      
      <h2>Add a new person</h2>

      <AddPersonForm savePerson={savePerson} handleFormNameChange={handleFormNameChange} handleFormNumberChange={handleFormNumberChange} newName={newName} newNumber={newNumber} />
      
      <h2>Numbers</h2>

      <Phonebook persons={persons} searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} deletePerson={deletePerson} />
    </div>
  )
}

export default App