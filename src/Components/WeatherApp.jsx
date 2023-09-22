import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const WeatherApp = () => {
  const API_key = ""; // API Key openweathermap.org
  const IP_key = ""; // API Key ipify.org

  const [userLocation, setUserLocation] = useState([]);
  const [errorGeolocation, setErrorGeolocation] = useState();
  const [userIp, setUserIp] = useState("");
  const [ipLocation, setIpLocation] = useState([]);
  const [weatherIpLocation, setWeatherIpLocation] = useState([]);

  const navigateWeatherApp = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily,hourly,minutely&units=metric&appid=${API_key}`,
        )
          .then((res) => res.json())
          .then((res) => {
            setUserLocation(res);
          })
          .catch((err) => console.error("Error UserLocation: ", err));
      },
      (error) => {
        console.error("Error Geolocation: ", error);
        setErrorGeolocation(false);
      },
    );
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((res) => {
        setUserIp(res.ip);
      })
      .catch((err) => console.error("Error UserIp: ", err));
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${IP_key}&ipAddress=${userIp}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setIpLocation(res.location.city);
      })
      .catch((err) => console.error("Error IpLocation: ", err));
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ipLocation}&units=metric&appid=${API_key}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setWeatherIpLocation(res.main.temp);
      })
      .catch((err) => console.error("Error weatherIpLocation: ", err));
  }, [ipLocation, weatherIpLocation, userIp]);

  return (
    <div className="result-weather">
      {errorGeolocation ? (
        userLocation.map((item) => {
          return (
            <div key={v4()}>
              <div className="result-degrees">
                {Math.round(item.current.temp)}°C
              </div>
              <div className="location-degrees">Windy in your location</div>
            </div>
          );
        })
      ) : (
        <div key={v4()}>
          <div className="result-degrees">
            {Math.round(weatherIpLocation)}°C
          </div>
          <div className="location-degrees">Windy in {ipLocation}</div>
        </div>
      )}
      <button
        className="change-btn"
        onClick={() => navigateWeatherApp("/find-city")}>
        Change city
      </button>
    </div>
  );
};

export default WeatherApp;
