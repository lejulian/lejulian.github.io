import { createContext, useRef } from "react";
import { useStateWithLocalStorage, useStateWithLocalStorageAndRef } from "../hooks";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {

  const atcAudio = useRef();
  const musicAudio = useRef();

  const [atcVolume, setAtcVolume] = useStateWithLocalStorage("atc-volume", 0.5);
  const [musicVolume, setMusicVolume, musicVolumeRef] = useStateWithLocalStorageAndRef("music-volume", 0.5);

  const value = {
    atcAudio,
    musicAudio,
    atcVolume,
    setAtcVolume,
    musicVolumeRef,
    setMusicVolume
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export const AudioConsumer = AudioContext.Consumer;
