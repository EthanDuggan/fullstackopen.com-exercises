import axios from 'axios'

const baseURL = 'https://restcountries.com/v3.1/'

const getAllCountriesData = () => {
    return axios.get(baseURL + 'all')
        .then(response => response.data)
}

export default {getAllCountriesData}