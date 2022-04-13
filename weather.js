#! usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getCoordinates } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess(`Город ${city} успешно сохранен`);
  } catch (error) {
    printError(error.message);
  }
};

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен успешно сохранен");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const weather = await getCoordinates(
      process.env.CITY
        ? process.env.CITY
        : await getKeyValue(TOKEN_DICTIONARY.city)
    );
    printWeather(weather);
  } catch (error) {
    if (error?.response?.status === 401) {
      printError("Неверно указан город");
    } else if (error?.response?.status === 404) {
      printError("Неверно указан токен");
    } else {
      printError(error.message);
    }
  }
};

async function weatherCli() {
  const args = getArgs(process.argv);
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.h) {
    return printHelp();
  }
  if (args.t) {
    return saveToken(args.t);
  }
  // вывод текущей погоды
  return getForcast();
}

weatherCli();
