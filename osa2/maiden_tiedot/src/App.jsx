import { useState, useEffect } from 'react'
import countriesService from './services/countries'


const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <p>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="100"
        />
        </p>
     </div>
  )
}

const Country = ({ country, singleMatch, showDetails, onShowClick }) => {
  const handleShowClick = () => {
    onShowClick(country.cca3)
  };
  if (singleMatch || showDetails === country.cca3 ) {
    return (
      <CountryInfo country={country} />
    )
  }
  else {
    return (
      <li>{country.name.common} 
        <button onClick={handleShowClick}>
          show
        </button>
        
      </li>

    )
  }
}

const Filter = ({ searchCountries, handleFiltering }) => {
  return (
    <form>
        find countries
        <input
          value = {searchCountries}
          onChange={handleFiltering}
          />
      </form>
  )
}
const CountryNames = ({ filteredCountries, handleShowClick, showDetails }) => {
  const singleMatch = filteredCountries.length === 1

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  }
  return (
    <ul>
        {filteredCountries.map(country =>
          <Country key={country.cca3} country={country} singleMatch={singleMatch} onShowClick={handleShowClick} showDetails={showDetails}/>
        )}
    </ul>
  )
}



const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')
  const [showDetails, setShowDetails] = useState(null)

  const handleShowClick = (countryId) => {
    setShowDetails(showDetails === countryId ? null : countryId)
  }

  const filteredCountries = searchCountries ? countries.filter(country => {
    return country.name && typeof country.name.common === 'string' &&
          country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
  }) : []

  const handleFiltering = (event) => {
    setSearchCountries(event.target.value)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])
  
  return (
    <div>


        <Filter searchNames={searchCountries} handleFiltering={handleFiltering} />
      

        <CountryNames filteredCountries={filteredCountries} handleShowClick={handleShowClick} showDetails={showDetails}/>
      </div>
    )

}

export default App
