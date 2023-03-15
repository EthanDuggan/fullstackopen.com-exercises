import {useState, useEffect} from 'react'

import weatherAPI from '../services/weather'

const CountryInfoView = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherAPI.getWeatherAtCapital(country)
            .then(data => setWeather(data))
    })

    return (
        <div>
            <h1>{country.name.common}</h1>
            <img src={country.flags.png} />
            <h2>Basic Info</h2>
            <p>
                capital: {country.capital[0]}
                <br/>
                area: {country.area}
            </p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <h2>Weather in {country.capital[0]}</h2>
            <img src={weather ? weather.condition.icon : ''} />
            <p>
                temperature: {weather ? `${weather.temp_c} celsius` : 'loading...'}
                <br/>
                wind: {weather ? `${weather.wind_kph} kph` : 'loading...'}
            </p>
        </div>
    )
}

export default CountryInfoView