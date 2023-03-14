import axios from 'axios'

const personsURL = 'http://localhost:3001/persons/'

const getAllPersons = () => {
    return (
        axios
            .get(personsURL)
            .then(response => response.data)
    )
}

const savePerson = newPersonObject => {
    return (
        axios
            .post(personsURL, newPersonObject)
            .then(response => response.data)
    )
}

const deletePerson = id => {
    return (
        axios
            .delete(personsURL + id)
            .then(response => response.data)
    )
}

export default {getAllPersons, savePerson, deletePerson}