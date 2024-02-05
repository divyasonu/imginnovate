import React, { useState } from "react";
import "./Search.css";
import { getWetherData } from "../../services/weatherService";

const Search = () => {
  const [city, setCity] = useState("");

  const [data, setData] = useState([]);
  console.log(data, "data");
  const [location, setCityNameFromAPI] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = () => {
    getWetherData(city)
      .then((resp) => {
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
          const date = new Date(data.dt_txt + " UTC")
            .toISOString()
            .split("T")[0];

          if (!uniqueDates.includes(date)) {
            uniqueDates.push(date);
            deduplicatedData.push(data);
          }
        });

        console.log("Filtered Data:", filteredData);

        const firstFiveRecords = filteredData.slice(0, 5);
        setData(firstFiveRecords);

        console.log("First Five Records:", firstFiveRecords);
      })
      .finally(() => {
        setLoading(false);
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
    <div className="container mt-5">
      <h1 className="text-center text-white">
        Weather Forecast for Next Four Days
      </h1>
      <div className="d-flex justify-content-center row mt-4 gap-3 text-center">
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
        {loading && (
          <div className="spinner-border text-white" role="status">
            <span className="sr-only text-white">Loading...</span>
          </div>
        )}
        <div className="col-lg-6 col-md-6 col-sm-6">
          <img
            className="img-fluid"
            src="https://play-lh.googleusercontent.com/IYscPocOKRrhYTRKoF6I3iHAQIzph2cpMBfxA7riRIQ-GadOP77RCYHiH0go_FAxRjQ=w240-h480-rw"
          />
        
        </div>{" "}
        <p className="h5 text-white">Weather Report</p>
        <div className="h2 text-white display-2">{location} </div>
        {data?.map((item, index) => {
          return (
            <div className="col mt-5 border" key={index}>
              <div className="text-white justify-content-around">
                Date:{" "}
                {new Date(item?.dt_txt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
              <div className="temp d-flex row text-white">
                <div className="border ">Temperature</div>
                <div className="col border text-white">Min</div>
                <div className="col border text-white">Max</div>
              </div>
              <div className="temp d-flex row text-white">
                <div className="col border">
                  {Math.round(item?.main?.temp_max) - 273}&deg; C
                </div>

                <div className="col border">
                  {Math.round(item?.main?.temp_min) - 273}&deg; C
                </div>
              </div>
              <div className="temp d-flex row text-white">
                <div className="col border">Humidity</div>
                <div className="col border">{item?.main?.humidity} %</div>
              </div>
              <div className="temp d-flex row text-white">
                <div className="col border">Pressure</div>
                <div className="col border">{item?.main?.pressure}</div>
              </div>
            </div>
          );
        })}
        {/* <div className="row mt-5">
          {data.map((item, index) => (
            <div className="col" key={index}>
              <table className="table table-bordered rounded text-white">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Temperature (Min)</th>
                    <th scope="col">Temperature (Max)</th>
                    <th scope="col">Humidity</th>
                    <th scope="col">Pressure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item?.dt_txt}</td>
                    <td>{item?.main?.temp_min}</td>
                    <td>{item?.main?.temp_max}</td>
                    <td>{item?.main?.humidity}</td>
                    <td>{item?.main?.pressure}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};
export default Search;
