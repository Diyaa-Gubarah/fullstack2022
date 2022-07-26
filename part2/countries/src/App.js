import { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  const handleFilterText = async (event) => {
    const filter = event.target.value;

    const copyCountries = [...countries];

    const filteredCountries = copyCountries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredCountries.length === 1) {
      const weather = await getCountryWeather(filteredCountries[0].latlng);
      filteredCountries[0] = { ...weather, ...filteredCountries[0] };
    }

    setFilterCountries(filteredCountries || countries);
  };

  const viewCountry = async (country) => {
    const weather = await getCountryWeather(country.latlng);

    weather && setFilterCountries([{ ...country, ...weather }]);
  };

  const fetch = async () => {
    const result = await axios.get("https://restcountries.com/v3.1/all");

    setCountries([...result.data]);
    setFilterCountries([...result.data]);
  };

  const getCountryWeather = async ([lat, lon]) => {
    const result = await axios.get(`
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&APPID=${process.env.REACT_APP_WEATHER_KEY}`);

    return {
      temp: result.data.main.temp,
      icon: `https://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`,
      speed: result.data.wind.speed,
    };
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      find countries: <input type="text" onChange={handleFilterText} />
      {filterCountries.length === 1 ? (
        <div>
          <h2>{filterCountries[0].name.common}</h2>
          capital {filterCountries[0].capital}
          <br />
          area {filterCountries[0].area}
          <h3>languages</h3>
          <ul>
            {Object.values(filterCountries[0].languages).map((language, i) => (
              <li key={language + i}>{language}</li>
            ))}
          </ul>
          <img
            src={filterCountries[0].flags.png}
            alt={filterCountries[0].name}
          />
          <div>
            <h3>Weather in {filterCountries[0].capital}</h3>
            <p>
              temperature {(filterCountries[0].temp - 32) * (5 / 9)} Celsius
            </p>
            <img src={filterCountries[0].icon} alt="weather icon" />
            <p>wind {filterCountries[0].speed} m/s</p>
          </div>
        </div>
      ) : filterCountries.length < 10 ? (
        <ul style={{ listStyle: "none" }}>
          {filterCountries.map((country, i) => (
            <li key={country.name.common + i}>
              {country.name.common}
              &nbsp;<button onClick={() => viewCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Too much matches specify another filter</p>
      )}
    </div>
  );
}

export default App;
