import { useState } from "react";
import AudioControls from "../AudioControls";
import { AUDIO_STATUS } from "../../utils";
import "./index.scss";

function MusicDisplay({ selectedMusic, musicAudioStatus }) {
  return (
    <a className={`music-credit-link ${musicAudioStatus === AUDIO_STATUS.LOADING ? "loading" : ""}`} href={selectedMusic.youtube} target="_blank" rel="noopener noreferrer">
      {
        musicAudioStatus === AUDIO_STATUS.BROKEN && <h5 className="music-name">Music could not load. Try refreshing.</h5>
      }
      {
        (musicAudioStatus === AUDIO_STATUS.PLAYING || musicAudioStatus === AUDIO_STATUS.PAUSED || musicAudioStatus === AUDIO_STATUS.LOADING) && (
          <h5 className="music-name">
            <img src="/assets/icons/music-note-white.svg"/>
            {selectedMusic.name}
          </h5>
        )
      }
    </a>
  )
}

function NoAirportWithMusicDisplay({ selectedMusic, musicAudioStatus }) {
  return (
    <>
      <div className="audio-info-box">
        No airport selected
      </div>
      <MusicDisplay 
        selectedMusic={selectedMusic} 
        musicAudioStatus={musicAudioStatus} 
      />
    </>
  )
}

function AirportWithMusicDisplay({ 
  atcAudioStatus, 
  musicAudioStatus, 
  selectedAirport, 
  selectedAirportExternalUrl,
  selectedMusic,
}) {

  const [curFreq, setCurFreq] = useState(0);

  function nextFreq() {
    const numFreqs = Object.keys(selectedAirport.feedFrequencies).length;
    setCurFreq(
      (curFreq + 1) % numFreqs
    )
  }

  let atcStatusIndicator;
  if (atcAudioStatus === AUDIO_STATUS.PLAYING) {
    atcStatusIndicator = (
      <div className="live-indicator status-indicator">
        <span className="blinking-circle">{"• "}</span>
        LIVE
      </div>
    )
  }
  else if (atcAudioStatus === AUDIO_STATUS.LOADING) {
    atcStatusIndicator = (
      <div className="down-indicator status-indicator">
        LOADING
      </div>
    )
  }
  else if (atcAudioStatus === AUDIO_STATUS.BROKEN) {
    atcStatusIndicator = (
      <div className="down-indicator status-indicator">
        FEED DOWN
      </div>
    )
  }

  let feedFrequency;
  const numFreqs = Object.keys(selectedAirport.feedFrequencies).length;
  if (!selectedAirport.feedFrequencies || Object.keys(selectedAirport.feedFrequencies).length === 0 ){
    feedFrequency = null;
  }
  else {
    const key = Object.keys(selectedAirport.feedFrequencies)[curFreq];
    feedFrequency = (
      <div className="audio-floating-info" onClick={nextFreq}>
        <h2 className="atc-frequency">{selectedAirport.feedFrequencies[key]}</h2>
        <h4 className="atc-frequency-type">{`${key} (${curFreq + 1}/${numFreqs})`}</h4>
      </div>
    )
  }
  
  return (
    <>
      {feedFrequency}
      <div className="audio-info-box">
        {atcStatusIndicator}
        <div className="action-icons">
          {selectedAirportExternalUrl && <a className="action-icon" href={selectedAirportExternalUrl} target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/broadcast-white.svg"/>
          </a>}
        </div>
        <h2 className="airport-code">{selectedAirport.icao}</h2>
        <h4 className="airport-name">{selectedAirport.name}</h4>
      </div>
      {atcAudioStatus !== AUDIO_STATUS.BROKEN && <MusicDisplay 
        selectedMusic={selectedMusic} 
        musicAudioStatus={musicAudioStatus} 
      />}
    </>
  )
}

function MainAudioSection({
  isPlaying,
  togglePlayPause,
  atcAudioStatus,
  musicAudioStatus,
  selectedMusic,
  selectedAirport,
  randomizeMusic,
}) {

  function getSelectedAirportExternalUrl() {
    if (!selectedAirport) {
      return null;
    }
    return `https://www.liveatc.net/search/?icao=${selectedAirport.icao}`;
  }

  const selectedAirportExternalUrl = getSelectedAirportExternalUrl();

  return (
    <div className="main-audio-section">
      {selectedAirport 
        ? <AirportWithMusicDisplay 
            atcAudioStatus={atcAudioStatus}
            musicAudioStatus={musicAudioStatus}
            selectedAirport={selectedAirport} 
            selectedAirportExternalUrl={selectedAirportExternalUrl}
            selectedMusic={selectedMusic} 
          />
        : <NoAirportWithMusicDisplay 
            selectedMusic={selectedMusic} 
            musicAudioStatus={musicAudioStatus}
          />
      }
      <AudioControls
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        randomizeMusic={randomizeMusic}
        musicAudioStatus={musicAudioStatus}
        atcAudioStatus={atcAudioStatus}
        selectedAirport={selectedAirport}
      />
    </div>
  )
}

export default MainAudioSection;