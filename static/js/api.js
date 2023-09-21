import axios from "axios";

export function autocomplete(typed) {
  if (typed.length > 4) {
    return Promise.resolve([]);
  }
  return axios(`/autocomplete/${typed}`);
}

export function getAirportInfo(icao) {
  return axios(`/airport/${icao}`);
}

export function getRandomAirportInfo() {
  return axios(`/airport/random`);
}