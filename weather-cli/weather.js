import { getArgs } from "./helpers/args.js"
import { getWether } from "./services/api.service.js"
import { printError, printHelp, printSuccess } from "./services/log.service.js"
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

const initCLI = () => {
  const args = getArgs(process.argv)
  
  if(args.h) {
    printHelp()
  }
  if(args.s) {
    saveKeyValue('town', args.s)
  }
  if(args.t) {
    return saveToken(args.t)
  }
  getWether('kiev')
}

initCLI()