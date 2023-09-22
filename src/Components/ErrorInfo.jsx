import { useNavigate } from "react-router-dom";

const ErrorInfo = () => {
  const navigateError = useNavigate();

  return (
    <div className="error-block">
      <div className="error-notice">
        <p className="error-text">Ooops. Something went wrong.</p>
        <p className="error-info">Incorrect value or city</p>
      </div>
      <button className="error-btn" onClick={() => navigateError("/find-city")}>
        Try again
      </button>
    </div>
  );
};

export default ErrorInfo;
