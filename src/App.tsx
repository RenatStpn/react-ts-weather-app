import { useState, useEffect } from 'react'
import CurrentWeather from './Components/CurrentWeather'
import Forecast from './Components/Forecast'
import Search from './Components/Search'
import { weather_API_URL, API_key } from './Types/IOptions'
import axios from 'axios'

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const getDataFromSearchedCity = (searchedCity: string) => {
    const coordinates = searchedCity.split(" ");
    const lat = coordinates[0]
    const lon = coordinates[1]
    const currentWeather_URL = `${weather_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
    const forecast_URL = `${weather_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=a1cff6135805df2b8d9ff4079c94d3d4&units=metric`
    axios.get(currentWeather_URL)
      .then((response) => {
        setCurrentWeather(response.data)
      })

    axios.get(forecast_URL)
      .then((response) => {
        setForecast(response.data.list)
      })
  }
  return (
    <>
      <Search onSearchChange={getDataFromSearchedCity} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </>
  )
}
export default App 