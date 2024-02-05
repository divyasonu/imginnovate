import React, { useState } from "react";
import "./Search.css";
import { getWetherData } from "../../services/weatherService";

const Search = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherFirstData] = useState([]);

  const fetchWeatherData = () => {
    getWetherData(city).then((resp) => {
    console.log(resp.list[0],"response")
      setWeatherFirstData(resp.list[0]);
      // setWeatherSecData(resp.list[0]);
      // setWeatherThirdData(resp.list[0]);
      // setWeatherFourData(resp.list[0]);
      // setWeatherFiveData(resp.list[0]);
    });
  };

  const handleChange = (e) => {
    // console.log(e.target.value)
    setCity(e.target.value);
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };
  return (
    <div className="container mt-2">
      <h1 className="text-center text-white">Weather Forecast</h1>
      <div className="d-flex justify-content-center row mt-5 gap-3 text-center">
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            className="search-bar"
            placeholder="Enter location"
            onChange={handleChange}
            onKeyDown={handleKey}
            value={city}
          />
          <button type="submit" className="search-btn p-3 rounded-circle">
            <i className="bi bi-search" />
          </button>
        </form>

        <div className="col mt-5 border">
          <div className="text-white">Date: {weatherData?.dt_txt}</div>
          <div className="temp d-flex row text-white">
            <div className="col border text-white">
              min:{weatherData?.dt_txt}
            </div>
            <div className="col border text-white">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
        </div>
       < div className="col mt-5 border">
          <div className="text-white">Date: </div>
          <div className="temp d-flex row text-white">
            <div className="col border text-white">
              min:
            </div>
            <div className="col border text-white">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
        </div>
        <div className="col mt-5 border">
          <div className="text-white">Date: </div>
          <div className="temp d-flex row text-white">
            <div className="col border text-white">
              min:{weatherData?.dt_txt}
            </div>
            <div className="col border text-white">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
        </div>
        <div className="col mt-5 border">
          <div className="text-white">Date: </div>
          <div className="temp d-flex row text-white">
            <div className="col border text-white">
              min:{weatherData?.dt_txt}
            </div>
            <div className="col border text-white">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
        </div>
        <div className="col mt-5 border">
          <div className="text-white">Date: </div>
          <div className="temp d-flex row text-white">
            <div className="col border text-white">
              min:{weatherData?.dt_txt}
            </div>
            <div className="col border text-white">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
          <div className="temp d-flex row text-white">
            <div className="col border">min</div>
            <div className="col border">max</div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};
export default Search;
