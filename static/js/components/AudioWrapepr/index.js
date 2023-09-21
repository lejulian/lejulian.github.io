import React, { useContext, useEffect, useRef } from "react";
import { AUDIO_STATUS, debounce, getMusicFileUrl } from "../../utils";
import { useStateWithRef } from "../../hooks";
import BackgroundVisual from "../BackgroundVisual";
import MainAudioSection from "../MainAudioSection"
import "./index.scss";
import { AudioContext } from "../../context/AudioContext";

const AUDIO_ID = {
  MUSIC: "music-audio-player",
  MUSIC_LOADING: "music-audio-player-loading",
  ATC: "atc-audio-player",
}

function AudioWrapper({ 
  selectedMusicIndex, 
  setSelectedMusicIndex,
  musicOptions,
  selectedAirport, 
  showAudioPlayer, 
  randomizeMusic,
}) {
  const { atcAudio, atcVolume, musicAudio, musicVolumeRef } = useContext(AudioContext);

  const [isPlaying, setIsPlaying, isPlayingRef] = useStateWithRef(false);
  const [atcAudioStatus, setAtcAudioStatus, atcAudioStatusRef] = useStateWithRef(AUDIO_STATUS.PAUSED);
  const [musicAudioStatus, setMusicAudioStatus, musicAudioStatusRef] = useStateWithRef(AUDIO_STATUS.PAUSED);
  
  const musicAudioLoading = useRef();
  const selectedMusic = musicOptions[selectedMusicIndex];

  useEffect(() => {
    if (selectedMusic && !musicAudio.current) {
      const url = getMusicFileUrl(selectedMusic.name);
      musicAudio.current = createAudioElement(url, AUDIO_ID.MUSIC, musicAudioStatus, setMusicAudioStatus);
    }
  }, [musicAudio, selectedMusic]);

  useEffect(() => {
    if (selectedAirport && !atcAudio.current) {
      atcAudio.current = createAudioElement(selectedAirport.audioUrl, AUDIO_ID.ATC, atcAudioStatus, setAtcAudioStatus);
    }
  }, [atcAudio, selectedAirport]);

  const togglePlayPause = debounce(function() {
    if (musicAudioStatusRef.current === AUDIO_STATUS.CHANGING_SOURCE || 
    musicAudioStatusRef.current === AUDIO_STATUS.LOADING ||
    atcAudioStatusRef.current === AUDIO_STATUS.LOADING) {
      return;
    }
    if (!isPlayingRef.current) {
      atcAudio.current.play();
      musicAudio.current.play();
      setIsPlaying(true);
    }
    else {
      atcAudio.current.pause();
      musicAudio.current.pause();
      setIsPlaying(false);
    }
  }, 250);

  function createAudioElement(url, id, curStatus, setStatus) {
    let audioElement = createAudioElementBase(url, id);
    attachAudioEventHandlers(audioElement, curStatus, setStatus);
    // if it's music, we want to handle preloading the next one
    if (id === AUDIO_ID.MUSIC) {
      attachAddNextMusicHandler(audioElement, selectedMusicIndex);
    }
    return audioElement;
  }

  function createAudioElementBase(url, id) {
    let audioElement = new window.Audio(url);
    audioElement.preload = 'metadata';
    audioElement.setAttribute("id", id);
    audioElement.controls = false;
    if (id === AUDIO_ID.MUSIC || id === AUDIO_ID.MUSIC_LOADING) {
      audioElement.volume = musicVolumeRef.current;
    }
    else {
      audioElement.volume = atcVolume;
    }
    document.querySelector('.audio-wrapper').appendChild(audioElement);
    return audioElement;
  }

  function attachAudioEventHandlers(audioElement, curStatus, setStatus) {
    audioElement.addEventListener('play', () => {
      if (curStatus === AUDIO_STATUS.PAUSED) {
        setStatus(AUDIO_STATUS.LOADING);
      }
      const interval = setInterval(() => {
        if (audioElement.currentTime > 0) {
          setStatus(AUDIO_STATUS.PLAYING);
          clearInterval(interval);
        }
      }, 200);
    });
    audioElement.addEventListener('pause', () => {
      setStatus(AUDIO_STATUS.PAUSED);
    });
    audioElement.addEventListener('error', (err) => {
      setStatus(AUDIO_STATUS.BROKEN);
    });
    // error handling hook
    // kind of hacky with the interval
    const interval = setInterval(() => {
      // network state = 3 means NETWORK_NO_SOURCE
      // https://www.w3schools.com/tags/av_prop_networkstate.asp
      if (audioElement.networkState === 3) {
        setStatus(AUDIO_STATUS.BROKEN);
        clearInterval(interval);
      }
    }, 1000);
  }

  function attachAddNextMusicHandler(audioElement, curMusicIndex) {
    const PRE_LOAD_SECONDS = 10;
    const nextMusicIndex = (curMusicIndex + 1) % musicOptions.length;
    const nextMusic = musicOptions[nextMusicIndex];

    const preloadInterval = setInterval(() => {
      const curTime = audioElement.currentTime;
      const duration = audioElement.duration;
      if ((curTime + PRE_LOAD_SECONDS) >= duration) {
        const nextUrl = getMusicFileUrl(nextMusic.name);
        musicAudioLoading.current = createAudioElementBase(nextUrl, AUDIO_ID.MUSIC_LOADING);
        clearInterval(preloadInterval);
      }
    }, 1000);

    audioElement.addEventListener('ended', () => {
      setMusicAudioStatus(AUDIO_STATUS.CHANGING_SOURCE)
      // remove old audio element now that it's ended from the DOM
      musicAudio.current.remove();

      // start initializing the new music
      musicAudio.current = musicAudioLoading.current;
      musicAudio.current.id = AUDIO_ID.MUSIC;
      musicAudio.current.volume = musicVolumeRef.current;
      musicAudio.current.play();
      setSelectedMusicIndex(nextMusicIndex);

      // cleanup
      musicAudioLoading.current = null;

      // don't need dynamic get/set since it's always music 
      attachAudioEventHandlers(musicAudio.current, musicAudioStatus, setMusicAudioStatus);
      attachAddNextMusicHandler(musicAudio.current, nextMusicIndex);

      setMusicAudioStatus(AUDIO_STATUS.PLAYING);
    })
  }

  return (
    <>
      <BackgroundVisual
        isPlaying={isPlaying}
      />
      <div className="audio-wrapper">
        {showAudioPlayer && <MainAudioSection
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          atcAudioStatus={atcAudioStatus}
          musicAudioStatus={musicAudioStatus}
          selectedMusic={selectedMusic}
          selectedAirport={selectedAirport}
          randomizeMusic={randomizeMusic}
        />}
      </div>
    </>
  )
}

export default AudioWrapper;