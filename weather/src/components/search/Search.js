import React, { useState } from "react";
import "./Search.css";
import { getWetherData } from "../../services/weatherService";

const Search = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherFirstData] = useState([]);

  const [data, setData] = useState([]);
  console.log(data, "data");
  const [location, setCityNameFromAPI] = useState("");

  const fetchWeatherData = () => {
    getWetherData(city).then((resp) => {
      setCityNameFromAPI(resp?.city?.name);

      const filteredData = resp.list.filter((data, index, array) => {
        const currentDate = new Date();
        const forecastDate = new Date(data.dt_txt + " UTC");

        return (
          forecastDate.getUTCHours() === 21 &&
          forecastDate.getUTCDate() > currentDate.getUTCDate()
        );
      });

      // Deduplicate by date
      const uniqueDates = [];
      const deduplicatedData = [];

      filteredData.forEach((data) => {
        const date = new Date(data.dt_txt + " UTC").toISOString().split("T")[0];

        if (!uniqueDates.includes(date)) {
          uniqueDates.push(date);
          deduplicatedData.push(data);
        }
      });

      console.log("Filtered Data:", filteredData);

      const firstFiveRecords = filteredData.slice(0, 5);
      setData(firstFiveRecords);

      console.log("First Five Records:", firstFiveRecords);
    });
  };

  const handleChange = (e) => {
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

        <div className="h2 text-white display-2">{location} </div>

        {data?.map((item, index) => {
          return (
            <div className="col mt-5 border" key={index}>
              <div className="text-white">Date: {item?.dt_txt}</div>
              <div className="temp d-flex row text-white">
                <div className="border">Temperature</div>
                <div className="col border text-white">Min</div>
                <div className="col border text-white">Max</div>
              </div>
              <div className="temp d-flex row text-white">
                <div className="col border">{item?.main?.temp_max}</div>

                <div className="col border">{item?.main?.temp_min}</div>
              </div>
              <div className="temp d-flex row text-white">
                <div className="col border">Humidity</div>
                <div className="col border">{item?.main?.humidity}</div>
              </div>
              <div className="temp d-flex row text-white">
                <div className="col border">Pressure</div>
                <div className="col border">{item?.main?.pressure}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Search;
