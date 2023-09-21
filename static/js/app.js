import { useState, useEffect } from "react";
import AudioWrapper from "./components/AudioWrapper";
import ChangeAirportScreen from "./screens/ChangeAirportScreen";
import AudioSettingsScreen from "./screens/AudioSettingsScreen";
import { getRandomAirportInfo, getAirportInfo } from "./api";
import { musicOptions } from "./music";
import { getRandomIndex } from "./utils";
import './global.scss';
import './App.scss';

const SCREENS = {
  AUDIO_PLAYER: 'AUDIO_PLAYER',
  AIRPORT_SELECT: 'AIRPORT_SELECT',
  AUDIO_SETTINGS: 'AUDIO_SETTINGS',
}

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.AUDIO_PLAYER);
  const [selectedAirportInfo, setSelectedAirportInfo] = useState(null);
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const icaoUrlParam = urlParams.get("icao");
    if (icaoUrlParam) {
      getSpecificAirportIfValid(icaoUrlParam);
    }
    else {
      randomizeAirport();
    }
    const musicParam = urlParams.get("music") ? Number(urlParams.get("music")) : isNaN;
    if (!isNaN(musicParam) && musicParam >= 0 && musicParam < musicOptions.length) {
      setSelectedMusicIndex(musicParam);
    }
    else {
      randomizeMusic();
      urlParams.delete("music");
      window.history.replaceState({}, document.title, "?" + urlParams.toString());
    }
  }, []);

  function getSpecificAirportIfValid(icao) {
    getAirportInfo(icao)
      .then((response) => {
        if (response.status === 200) {
          setSelectedAirportInfo(response.data)
        }
      })
      .catch(() => {
        randomizeAirport();
      })
  }

  function randomizeAirport() {
    getRandomAirportInfo()
      .then((response) => {
        if (response.status === 200) {
          setSelectedAirportInfo(response.data);
          // update url param
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.set("icao", response.data.icao.toLowerCase());
          window.history.replaceState(null, null, "?"+urlParams.toString());
        } 
      })
      .catch(() => {
        // if there's an issue, we'll just set it to KJFK
        setSelectedAirportInfo({
          "icao":"KJFK",
          "feedUrl":"https://www.liveatc.net/hlisten.php?mount=kjfk_twr&icao=kjfk",
          "feedLabel":"KJFK Tower",
          "name":"John F Kennedy International Airport",
          "feedFrequencies": {
            "Boston Center (HTO31 Sector)":"124.525",
            "Boston Center (SOUTHIE49 Sector)":"132.300"
          },
          "audioUrl":"s1-bos.liveatc.net/kjfk_twr"
        });
      });
  }

  function randomizeMusic() {
    setSelectedMusicIndex(getRandomIndex(musicOptions.length))
  }

  return (
    <div className="App">
      {selectedMusicIndex !== null && (
        <AudioWrapper
          selectedMusicIndex={selectedMusicIndex}
          setSelectedMusicIndex={setSelectedMusicIndex}
          musicOptions={musicOptions}
          selectedAirport={selectedAirportInfo}
          showAudioPlayer={currentScreen == SCREENS.AUDIO_PLAYER}
          randomizeMusic={randomizeMusic}
        />
      )}
      <ChangeAirportScreen
        show={currentScreen == SCREENS.AIRPORT_SELECT}
        goBackFn={() => {
          setCurrentScreen(SCREENS.AUDIO_PLAYER);
        }}
      />
      <AudioSettingsScreen
        show={currentScreen == SCREENS.AUDIO_SETTINGS}
        goBackFn={() => {
          setCurrentScreen(SCREENS.AUDIO_PLAYER);
        }}
      />
      {currentScreen == SCREENS.AUDIO_PLAYER && (
        <div className="sidebar-actions">
          <div className="sidebar-action" onClick={() => setCurrentScreen(SCREENS.AIRPORT_SELECT)}>
            <img src="/assets/icons/airport-white.svg"/>
            <p className="desktop-only" >Airport</p>
          </div>
          {/**TODO: figure out why this isn't working on mobile safari */}
          <div className="sidebar-action desktop-only" onClick={() => setCurrentScreen(SCREENS.AUDIO_SETTINGS)}>
            <img src="/assets/icons/volume-white.svg"/>
            <p className="desktop-only" >Settings</p>
          </div>
        </div>
      )}
     
    </div>
  );
}

export default App;
