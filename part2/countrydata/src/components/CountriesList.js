const CountriesList = ({listCountries, showButtonOnClickHandlerBody}) => {

    const countriesListStyle = {
        listStyle: 'none',
    }

    return (
        <ul style={countriesListStyle}>
            {listCountries.map(country => {
                return (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => showButtonOnClickHandlerBody(country)}>show</button>
                    </li>
            )})}
        </ul>
    )
}

export default CountriesList