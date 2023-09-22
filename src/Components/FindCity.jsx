import { useNavigate } from "react-router-dom";

const ChangeCity = ({ onChange }) => {
  const navigateCity = useNavigate();

  const handleWeatherCity = (event) => {
    onChange(event.target.value);
  };

  function noDigits(event) {
    if ("1234567890".indexOf(event.key) !== -1) {
      event.preventDefault();
    }
  }

  return (
    <form className="find-form" onSubmit={() => navigateCity("/weather-city")}>
      <input
        type="text"
        className="search-city"
        onKeyPress={noDigits}
        placeholder="Type your city here"
        onChange={handleWeatherCity}
      />

      <hr className="hr-line" />

      <button className="find-btn" type="submit">
        Find
      </button>
    </form>
  );
};

export default ChangeCity;
