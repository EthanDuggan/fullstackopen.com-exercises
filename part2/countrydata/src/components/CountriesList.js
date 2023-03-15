const CountriesList = ({listCountries}) => {

    const countriesListStyle = {
        //listStyle: 'none',
    }

    return (
        <ul style={countriesListStyle}>
            {listCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
        </ul>
    )
}

export default CountriesList