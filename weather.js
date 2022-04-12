#! usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getCoordinates } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
} from "./services/log.services.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.services.js";

const saveToken = async (token) => {
  if(!token.length) {
    printError('Не передан токен')
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен успешно сохранен");
  } catch (error) {
    printError(error.message);
  }
};

function weatherCli() {
  const args = getArgs(process.argv);
  if (args.s) {
  }
  if (args.h) {
    printHelp();
  }
  if (args.t) {
    saveToken(args.t);
  }

  getCoordinates('moscow')
}

weatherCli();
