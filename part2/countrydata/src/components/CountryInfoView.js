const CountryInfoView = ({country}) => {
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
        </div>
    )
}

export default CountryInfoView