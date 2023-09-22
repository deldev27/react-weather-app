import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./Styles/styles.css";
import WeatherApp from "./Components/WeatherApp";
import FindCity from "./Components/FindCity";
import WeatherCity from "./Components/WeatherCity";
import ErrorInfo from "./Components/ErrorInfo";

function App() {
  const [city, setCity] = useState();

  const handleWeatherCity = (city) => {
    setCity(city);
  };

  return (
    <div className="App">
      <header className="header">
        <p>Weather</p>
      </header>

      <main className="main">
        <Routes>
          <Route path="*" element={<WeatherApp />} />
          <Route
            path="find-city"
            element={<FindCity onChange={handleWeatherCity} />}
          />
          <Route path="error" element={<ErrorInfo />} />
          <Route path="weather-city" element={<WeatherCity city={city} />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>With ❤️ by Del</p>
      </footer>
    </div>
  );
}

export default App;
