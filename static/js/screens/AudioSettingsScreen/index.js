import { useContext, useEffect, useRef } from "react";
import { AudioContext } from "../../context/AudioContext";
import { useStateWithRef } from "../../hooks";
import "./index.scss";

function SliderInput({ value, setValue }) {

  const [isDown, setIsDown, isDownRef] = useStateWithRef(false);
  const sliderFull = useRef();
  
  useEffect(() => {
    ['mousemove', 'touchmove'].forEach((action) => {
      document.addEventListener(action, (e) => {
        if (isDownRef.current) {
          handleChange(e);
        }
      });
    });
    
    ['mouseup', 'touchend'].forEach((action) => {
      document.addEventListener(action, (e) => {
        setIsDown(false);
      });
    });
  }, []);

  function handleChange(e) {
    const xPos = e.pageX ? e.pageX : e.touches[0].pageX;
    const change = xPos - sliderFull.current.getBoundingClientRect().left;
    const percent = change / sliderFull.current.offsetWidth;
    if (percent >= 0 && percent <= 1) {
      setValue(percent);
    }
    else if (percent < 0) {
      setValue(0);
    }
    else {
      setValue(1);
    }
  }

  function handleMouseDown(e) {
    handleChange(e);
    setIsDown(true);
  }

  function handleTouchStart(e) {
    handleChange(e);
    setIsDown(true);
  }

  return (
    <div className="slider-input" onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
      <div className="slider-input-line" ref={sliderFull}></div>
      <div className="slider-input-line-solid" style={{width: `${value * 100}%`}}></div>
      <div className="slider-input-btn" style={{left: `${value * 100}%`}} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}></div>
    </div>
  )
}

function AudioSettingsScreen({ show, goBackFn }) {

  const { atcAudio, musicAudio, atcVolume, setAtcVolume, musicVolumeRef, setMusicVolume } = useContext(AudioContext);

  useEffect(() => {
    if (atcAudio.current) {
      atcAudio.current.volume = atcVolume;
    }
  }, [atcVolume]);

  useEffect(() => {
    if (musicAudio.current) {
      musicAudio.current.volume = musicVolumeRef.current;
    }
  }, [musicVolumeRef.current]);

  if (!show) {
    return null;
  }

  return (
    <div className="audio-settings-screen screen">
      <div className="go-back-btn" onClick={goBackFn}>
        Go Back
      </div>
      <div className="settings-wrapper">
        <div className="settings-content-wrapper">
          <div className="settings-item">
            <h3 className="settings-item-label">SCOTUS Volume</h3>
            <SliderInput value={atcVolume} setValue={setAtcVolume} />
          </div>
          <div className="settings-item">
            <h3 className="settings-item-label">Music Volume</h3>
            <SliderInput value={musicVolumeRef.current} setValue={setMusicVolume} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioSettingsScreen;