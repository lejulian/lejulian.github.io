import { useState, useRef, useEffect } from "react";

export function useStateWithRef(initialValue) {
  const [value, _setValue] = useState(initialValue);
  const valueRef = useRef(value);

  function setValue(newValue) {
    _setValue(newValue);
    valueRef.current = newValue;
  }

  return [value, setValue, valueRef];
}

export function useStateWithLocalStorage(
  localStorageKey,
  fallBackDefault
) {
  const [value, setValue] = useState(
    getLocalStorageItem(localStorageKey) || fallBackDefault
  );

  useEffect(() => {
    setLocalStorageItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
}

function getLocalStorageItem(localStorageKey) {
  // localStorage is undefined during SSR on server
  // and on some older browsers
  if (typeof localStorage !== "undefined") {
    let value = localStorage.getItem(localStorageKey);
    return JSON.parse(value);
  } else {
    return null;
  }
}

function setLocalStorageItem(localStorageKey, value) {
  // localStorage is undefined during SSR on server
  // and on some older browsers
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }
}


export function useStateWithLocalStorageAndRef(
  localStorageKey,
  fallBackDefault
) {
  const [value, _setValue] = useStateWithLocalStorage(localStorageKey, fallBackDefault);
  const valueRef = useRef(value);

  function setValue(newValue) {
    _setValue(newValue);
    valueRef.current = newValue;
  }

  return [value, setValue, valueRef];
}