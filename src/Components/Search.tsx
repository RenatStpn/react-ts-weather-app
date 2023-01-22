import { useState, useEffect, useRef, useCallback } from "react"
import { ICityInfo } from "../Types/ICityInfo"
import { options } from "../geoApiOptions";
import axios from "axios"
import { debounce } from "lodash";
let coordinates: string;
const Search = ({onSearchChange}:any) => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [showSearch, setShowSearch] = useState(true)
  const firstUpdate = useRef(true);

  const handleSearch = useCallback(
    debounce((value) => {
      const loadCitys = async () => {
        try {
          options.url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${value}`
          const result = await axios.get(options.url, options);
          setData(result.data.data)
        } catch (error) {
          console.log(`ERROR:, ${error}`)
        }
      }
      loadCitys()
    }, 500),
    []
  );
  const handleOnFocus = (event: any) => {
    event.target.select()
  }
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    handleSearch(event.target.value)
    if (!showSearch) {
      setShowSearch(true)
    }
  }
  const getCoordinates = ((element: any) => {
    setShowSearch(false)
    coordinates = element.target.getAttribute('data-coordinates');
    setSearch(element.target.getAttribute('data-value'))
    onSearchChange(coordinates);
  })
  return (
    <>
      <div className='weather'>
        <div className="weather__search">
          <input
            placeholder="Search the city:"
            type="text"
            value={search}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
          />
          <div className="weather__search--line">
          </div>
        </div>
        {showSearch && <ul className="weather__list">
          {search.length ? data.map((item: ICityInfo, number) =>
            <li className="weather__list--el" key={number} data-coordinates={item.latitude + " " + item.longitude} data-value={item.city} onClick={getCoordinates}>
              {item.city}, {item.country}
            </li>
          ) : null}
        </ul>}
      </div>
    </>
  )
}
export default Search