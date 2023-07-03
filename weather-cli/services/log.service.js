import chalk from 'chalk'
import dedent from 'dedent-js'

export const printError = (error) => {
  console.log((chalk.bgRed(' ERROR ') + ' ' + error))
}

export const printSuccess = (message) => {
  console.log((chalk.bgGreen(' SUCCESS ') + ' ' + message))
}

export const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] - установка города
    -h - помощь
    -t [API_KEY] - сохранение токена
    `)
  )
}

export const printWeather = (res) => {
  console.log(
    dedent(`${chalk.bgYellow(' SUCCESS ')} Погода в городе ${res.name}
    ${res.weather[0].description}
    Температура: ${Math.floor(res.main.temp)}℃
    Влажность: ${res.main.humidity}%`)
  )
}