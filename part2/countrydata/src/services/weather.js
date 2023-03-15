import axios from 'axios'

const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY

const getWeatherAtCapital = country => {
    const q = `${country.capitalInfo.latlng[0]},${country.capitalInfo.latlng[1]}`

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: q},
        headers: {
            'X-RapidAPI-Key': weatherAPIKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    }
      
    return axios.request(options)
        .then(response => response.data.current)
        .catch(error => console.error(error))
}

export default {getWeatherAtCapital}