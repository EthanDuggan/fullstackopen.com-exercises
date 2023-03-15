import {useState, useEffect} from 'react'

import countriesAPI from './services/countries'

import CountriesList from './components/CountriesList'
import CountryInfoView from './components/CountryInfoView'

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    countriesAPI.getAllCountriesData()
      .then(data => setCountries(data))
  }, [])

  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  )

  const generateSearchResultView = () => {
    if(countriesToShow.length > 10) {
      return <p>Too many matches, try a more specific query.</p>
    } else if(countriesToShow.length > 1) {
      return <CountriesList listCountries={countriesToShow} />
    } else if(countriesToShow.length === 1) {
      return <CountryInfoView country={countriesToShow[0]} />
    } else {
      return null
    }
  }

  return (
    <div>
      <form onSubmit={event => event.preventDefault()}>
        find countries <input onChange={event => setSearchQuery(event.target.value)} />
      </form>
      {generateSearchResultView()}
    </div>
  );
}

export default App;
