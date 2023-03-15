import {useState, useEffect} from 'react'

import countriesAPI from './services/countries'
import weatherAPI from './services/weather'

import CountriesList from './components/CountriesList'
import CountryInfoView from './components/CountryInfoView'

function App() {
  //declare state
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  //fetch the data for all the countries when the app starts
  useEffect(() => {
    countriesAPI.getAllCountriesData()
      .then(data => setCountries(data))
  }, [])

  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  )

  //declare basic event handlers
  const showButtonOnClickHandlerBody = country => setSelectedCountry(country)
  const searchInputOnChangeHandler = event => {
    setSearchQuery(event.target.value)
    setSelectedCountry(null)
  }

  const generateSearchResultView = () => {
    if(selectedCountry){
      weatherAPI.getWeatherAtCapital(selectedCountry) //test
      return <CountryInfoView country={selectedCountry} />
    }else if(countriesToShow.length > 10) {
      return <p>Too many matches, try a more specific query.</p>
    } else if(countriesToShow.length > 1) {
      return <CountriesList listCountries={countriesToShow} showButtonOnClickHandlerBody={showButtonOnClickHandlerBody} />
    } else if(countriesToShow.length === 1) {
      return <CountryInfoView country={countriesToShow[0]} />
    } else {
      return null
    }
  }

  return (
    <div>
      <form onSubmit={event => event.preventDefault()}>
        find countries <input onChange={searchInputOnChangeHandler} />
      </form>
      {generateSearchResultView()}
    </div>
  );
}

export default App;
