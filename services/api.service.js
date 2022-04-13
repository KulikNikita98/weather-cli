import axios from "axios";

import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const getCoordinates = async (city) => {
  if (!city) {
    throw new Error("Выберите, пожалуйста, город");
  }
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error(
      "Не задан ключ API, задайте его через команду -t [API_KEY]"
    );
  }
  const data = axios
    .get("https://api.openweathermap.org/geo/1.0/direct", {
      params: {
        q: city,
        limit: 1,
        appid: token,
      },
    })
    .then((response) => {
      const [{ lat, lon }] = response.data;
      return [lat, lon];
    })
    .then((data) => {
      const [lat, lon] = data;
      return getWeather(lat, lon);
    });
    return data
};

const getWeather = async (lat, lon) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error(
      "Не задан ключ API, задайте его через команду -t [API_KEY]"
    );
  }
  const data = await axios
    .get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        lang: "ru",
        units: "metric",
        appid: token,
      },
    })
    .then(({ data }) => data);
    return data
};

export { getCoordinates };
