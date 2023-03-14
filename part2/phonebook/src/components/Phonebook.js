import Contact from './Contact'

const Phonebook = ({persons, searchQuery, handleSearchQueryChange, deletePerson}) => {

    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>search: <input value={searchQuery} onChange={handleSearchQueryChange}/></div>
            </form>
            <ul>
                {filteredPersons.map(person => <Contact key={person.name} person={person} deletePerson={deletePerson} />)}
            </ul>
        </div>
    )
}

export default Phonebook