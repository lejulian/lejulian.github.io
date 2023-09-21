import { useState, useEffect, useRef } from "react";
import { autocomplete } from "../../api";
import "./index.scss";

function ChangeAirportScreen({ show, goBackFn }) {

  const [codes, setCodes] = useState([]);
  const [userTypedIcaoCode, setUserTypedIcaoCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    setErrorMessage(null);
    if (show) {
      if (userTypedIcaoCode) {
        autocomplete(userTypedIcaoCode)
          .then((response) => {
            if (response.status === 200) {
              setCodes(response.data.codes);
            }
          });
      }
      else {
        setCodes([]);
      }
    }
  }, [userTypedIcaoCode]);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  function clearAndExit() {
    setUserTypedIcaoCode("");
    setCodes([]);
    goBackFn();
  }

  function selectAirport(selectedAirportCode) {
    window.location.href = `/?icao=${selectedAirportCode}`;
  }

  function getAutocompleteItem(item) {
    // normalize
    const itemUpper = item.toUpperCase();
    const userInputUpper = userTypedIcaoCode.toUpperCase();

    // split
    const split = itemUpper.split(userInputUpper);
    return (
      <>
        <span className="autocomplete-nonhighlight">{split[0]}</span>
        <span className="autocomplete-highlight">{userInputUpper}</span>
        <span className="autocomplete-nonhighlight">{split[1]}</span>
      </>
    )
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      selectAirport(userTypedIcaoCode);
    }
  }

  if (!show) {
    return null;
  }

  return (
    <div className="change-airport-screen screen">
      <div className="go-back-btn" onClick={clearAndExit}>
        Go Back
      </div>
      <div className="autocomplete-wrapper">
        <input 
          className="input-text"
          type="text" 
          placeholder="KJFK, KSFO, KLAX..."
          value={userTypedIcaoCode} 
          onChange={(e) => setUserTypedIcaoCode(e.target.value)} 
          onKeyPress={handleKeyPress}
          maxlength="4" 
          ref={inputRef}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="autocomplete-box">
          {codes.slice(0,10).map((code) => (
            <div className="autocomplete-item" onClick={() => selectAirport(code)}>{getAutocompleteItem(code)}</div>
          ))}
        </div>
        {codes.length === 0 && <div>
          <div className="or">OR</div>
          <a href="/" className="pick-btn">
            Random airport
          </a>  
        </div>}
      </div>
    </div>
  )
}

export default ChangeAirportScreen;