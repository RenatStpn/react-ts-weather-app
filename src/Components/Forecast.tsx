import { useState, useCallback } from "react";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion'
import { iDailyForecast, iDailyForecastArray } from "../Types/IForecast";
const Forecast = ({ data }: iDailyForecast) => {
    const WEEK__DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK__DAYS.slice(dayInAWeek, WEEK__DAYS.length).concat(WEEK__DAYS.slice(0, dayInAWeek));
    const [activeIndex, setActiveIndex] = useState(1)
    return (
        <div className="forecast">
            <div className="forecast__header">
                Daily forecast:
            </div>
            <Accordion allowZeroExpanded>
                <ul className="forecast__list">
                    {data.slice(0, 7).map((dailyForecast: iDailyForecastArray , idx: number) => {
                        return (
                            <AccordionItem uuid={idx} key={idx}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <li className="forecast__list--element">
                                            <div className="main__info">
                                                <div className="left">
                                                    <img src={`src/assets/icons/${dailyForecast.weather[0].icon}.png`} />
                                                    <div className="date">{forecastDays[idx]}</div>
                                                </div>

                                                <div className="info">
                                                    <div className="temperature">{Math.ceil(dailyForecast.main.temp_max)}°C {Math.floor(dailyForecast.main.temp_min)}°C</div>
                                                    <div className="description">{dailyForecast.weather[0].description}</div>
                                                </div>
                                            </div>

                                        </li>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className="forecast__extraInfo">
                                        <ul>
                                            <li>
                                                <div className="naming">Pressure:</div>
                                                <div className="result">{dailyForecast.main.pressure} hPa</div>
                                            </li>
                                            <li>
                                                <div className="naming">Clouds:</div>
                                                <div className="result">{dailyForecast.clouds.all}%</div>
                                            </li>
                                            <li>
                                                <div className="naming">Sea level:</div>
                                                <div className="result">{dailyForecast.main.sea_level} m</div>
                                            </li>
                                            <li>
                                                <div className="naming">Humidity:</div>
                                                <div className="result">{dailyForecast.main.humidity} %</div>
                                            </li>
                                            <li>
                                                <div className="naming">Wind speed:</div>
                                                <div className="result">{dailyForecast.wind.speed} m/s</div>
                                            </li>
                                            <li>
                                                <div className="naming">Feels like:</div>
                                                <div className="result">{dailyForecast.main.feels_like}°C</div>
                                            </li>
                                        </ul>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>)
                    })}
                </ul>
            </Accordion>
        </div >
    )
}
export default Forecast