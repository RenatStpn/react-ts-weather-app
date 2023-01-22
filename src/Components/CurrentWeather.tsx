import { iCurrentWeather } from "../Types/ICurrentWeather"

const CurrentWeather = ({data}:iCurrentWeather) => {
    return (
        <div className="currentWeather">
            <div className="currentWeather__header">
                <div className="currentWeather__header--description">
                    {data.name}, {data.sys.country}
                </div>
                <img 
                    className="currentWeather__header--icon" 
                    src={`src/assets/icons/${data.weather[0].icon}.png`}
                />
            </div>
            <div className="currentWeather__main">
                <div className="currentWeather__main--info">
                    <div className="currentWeather__main--value">
                        {Math.round(data.main.temp)}°C
                    </div>
                    <div className="currentWeather__main--description">
                        <div className="higher__part">
                            {data.weather[0].description.toUpperCase()}
                        </div>
                        <div className="lower__part">
                            Max {Math.ceil(data.main.temp_max)}℃ Min {Math.floor(data.main.temp_min)}℃
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}
export default CurrentWeather