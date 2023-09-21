import { useEffect } from "react";
import { AUDIO_STATUS } from "../../utils";
import "./index.scss";

const playIcon = '/assets/icons/play-black.svg';
const pauseIcon = '/assets/icons/pause-black.svg';

function AudioControls({
  isPlaying,
  togglePlayPause,
  randomizeMusic,
  musicAudioStatus,
  atcAudioStatus,
  selectedAirport,
}) {
  useEffect(() => {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        togglePlayPause();
      }
    })
  }, []);

  function goToRandomAirport() {
    window.location.href = `/`;
  }

  function shouldDisable() {
    return (
      musicAudioStatus === AUDIO_STATUS.CHANGING_SOURCE ||
      musicAudioStatus === AUDIO_STATUS.LOADING ||
      atcAudioStatus === AUDIO_STATUS.LOADING
    )
  }
  
  if (atcAudioStatus === AUDIO_STATUS.BROKEN) {
    return (
      <div className="feed-down-msg">
        <a href={selectedAirport.feedUrl} target="_blank" rel="noopener noreferrer">Airport feed</a> is currently not available. Refresh to try again or choose another airport.
      </div>
    )
  }

  return (
    <div className={`audio-controls ${shouldDisable() ? "disable" : ""}`}>
      {/* <div className="audio-control-icon-wrapper" onClick={randomizeMusic}>
        <img className="audio-control-icon" src="/assets/icons/refresh-music.svg"/>
        <p className="audio-control-label">Random music</p>
      </div> */}
      <div className="audio-toggle-button" onClick={togglePlayPause}>
        <img className="audio-toggle-icon" src={isPlaying ? pauseIcon : playIcon} />
      </div>
      {/* <div className="audio-control-icon-wrapper" onClick={goToRandomAirport}>
        <img className="audio-control-icon" src="/assets/icons/refresh-airport.svg"/>
        <p className="audio-control-label">Random airport</p>
      </div> */}
    </div>
  )
}

export default AudioControls;