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

const printWeather = (weatherData) => {
  console.log(dedent(`
  В городе ${chalk.bgBlue(' ' + weatherData.name + ' ' )} сейчас ${chalk.bgBlue(' ' + weatherData.weather[0].description + ' ')}.
  Текущая температура: ${chalk.bgBlue(' ' + weatherData.main.temp + ' ')} градусов.
  Максимальная температура: ${chalk.bgBlue(' ' + weatherData.main.temp_max + ' ')} градусов.
  Минимальная температура: ${chalk.bgBlue(' ' + weatherData.main.temp_min + ' ')} градусов.
  `))
}

export { printError, printSuccess, printHelp, printWeather };
