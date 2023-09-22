import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WeatherCity = ({ city }) => {
  const API_key = ""; // API Key openweathermap.org

  const [weatherFindCity, setWeatherFindCity] = useState([]);

  const navigateWeatherCity = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setWeatherFindCity(res);
      })
      .catch((err) => console.error("Error WeatherCity: ", err));
  }, [city]);

  return (
    <>
      {typeof city != "undefined" ? (
        <div className="result-weather">
          <div className="result-degrees">
            {Math.round(weatherFindCity?.main?.temp)}°C
          </div>
          <div className="location-degrees">
            Windy in {weatherFindCity?.name}
          </div>
          <button
            className="change-btn"
            type="submit"
            onClick={() => {
              navigateWeatherCity("/find-city");
              window.location.reload();
            }}>
            Change city
          </button>
        </div>
      ) : (
        navigateWeatherCity("/error")
      )}
    </>
  );
};

export default WeatherCity;
