import chalk from "chalk";
import dedent from "dedent-js";

const printError = function (error) {
  console.log(chalk.bgRed(" Error ") + " " + error);
};

const printSuccess = function (message) {
  console.log(chalk.bgGreen((" Success ") + " " + message));
};

const printHelp = function () {
  console.log(
    dedent(
      `
    ${chalk.bgCyan(" Help ")}
    'Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
  `
    )
  );
};

export { printError, printSuccess, printHelp };
