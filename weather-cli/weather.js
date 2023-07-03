import { getArgs } from "./helpers/args.js"
import { getWether } from "./services/api.service.js"
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js"
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js"

const saveToken = async (token) => {
  if (!token.length) {
    printError('Токен не передан')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранен')
  } catch(e) {
    printError(e.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError('Укажите город')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('Город сохранен')
  } catch(e) {
    printError(e.message)
  }
}

const getForcast = async () => {
  try {
    const weather = await getWether('kiev')
    printWeather(weather)
  } catch (e) {
    if(e?.response?.status == 404) {
      printError('Неверно указан город')
    } else if(e?.response?.status == 401) {
      printError('Неверно указан токен')
    } else {
      printError(e.message)
    }
  }
} 

const initCLI = () => {
  const args = getArgs(process.argv)
  
  if(args.h) {
    return printHelp()
  }
  if(args.s) {
    return saveCity(args.s)
  }
  if(args.t) {
    return saveToken(args.t)
  }
  return getForcast()
}

initCLI()