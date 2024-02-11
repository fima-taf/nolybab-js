import fs from 'fs'
import { LanguageFile, Configuration, FileTypes, I18nObject } from './types'
import chalk from 'chalk'
import { getI18nObjectFromI18nObject, getStringFromI18nObject } from './Helpers'

export const processI18nToCsv = (conf: Configuration) => {
  console.log(chalk.blue('Starting i18n-to-csv process'))

  const mainFilePath = `${conf.i18nFilesPath}/${conf.mainFileName}.${FileTypes.JSON}`
  
  const pathExists = fs.existsSync(mainFilePath)

  if (!pathExists) {
    throw new Error(`The main file '${conf.mainFileName}' wasn't found in '${conf.i18nFilesPath}'`)
  }

  let mainFile: I18nObject
  try {
    mainFile = JSON.parse(fs.readFileSync(mainFilePath).toString()) as I18nObject;
  } catch (e) {
    throw new Error('Failed to parse the JSON object of the main file')
  }

  
  const langFiles = loadLanguageFiles(conf.i18nFilesPath)
  
  const csvRows = convertToCsvRows(mainFile, langFiles, conf.csvDelimiter)

  const headersRow = generateHeadersRow(langFiles)

  csvRows.unshift([' '].concat(headersRow))

  const csvFilePath = fs.existsSync(conf.csvFilePath)

  if (!csvFilePath) {
    fs.mkdirSync(conf.csvFilePath)
  }

  fs.writeFileSync(`${conf.csvFilePath}/${conf.csvFileName}.${FileTypes.CSV}`, csvRows.map(e => e.join(conf.csvDelimiter)).join("\n"))

  console.log(chalk.blue('i18n-to-csv process has ended successfully'))
}

export const loadLanguageFiles = (i18nFilesPath: string): LanguageFile[] => {
  const langFiles: LanguageFile[] = []
  const fileNames = fs.readdirSync(i18nFilesPath)
  fileNames.forEach(f => {
    if (f.includes(`.${FileTypes.JSON}`)) {
      const langFile = fs.readFileSync(`${i18nFilesPath}/${f}`, {encoding: 'utf-8'})
      if (langFile) {
        langFiles.push({name: f, file: JSON.parse(langFile) as I18nObject})
      } else {
        throw new Error(`The language file '${f}' wasn't found in '${i18nFilesPath}'`)
      }
    }
  })
  console.log(chalk.blue(`${langFiles.length} files were loaded.`))
  return langFiles
}

export const generateHeadersRow = (langFiles: LanguageFile[]) => {
  return langFiles.map(f => f.name.replace(`.${FileTypes.JSON}`, ''))
}

export const convertToCsvRows = (mainFile: I18nObject, langFiles: LanguageFile[], csvDelimiter: string) => {
  const mainFileKeys = extractKeysFromObject(mainFile)
  const resultRows = []

  for (let i = 0; i < mainFileKeys.length; i++) {
    const currentKey = mainFileKeys[i]
    const row = []
    row.push(currentKey)

    for (let j = 0; j < langFiles.length; j++) {
      const langFile = langFiles[j].file
      row.push(extractValueFromObject(langFile, currentKey.split('.'), csvDelimiter))
    }

    resultRows.push(row)
  }
  return resultRows
}

export const extractKeysFromObject = (obj: I18nObject, parentKeyName?: string) => {
  let result: string[] = []
  for (const key of Object.keys(obj)) {
    const value = obj[key]

    if (typeof value === 'string') {
      result.push(getNolybabKeyName(key, parentKeyName))
    } else if (typeof value === 'object') {
      result = result.concat(extractKeysFromObject(value, getNolybabKeyName(key, parentKeyName)))
    } else {
      // handle other types
    }
  }
  return result
}

export const getNolybabKeyName = (key: string, parentKey?: string) => {
  return parentKey ? `${parentKey}.${key}` : key
}

export const extractValueFromObject = (obj: I18nObject, splitKey: string[], delimiter: string): I18nObject | string | undefined => {
  const parentKey = splitKey[0]
  if (splitKey.length === 1) {
    return handleCsvWrapper(getStringFromI18nObject(obj[parentKey]))
  } else {
    if (obj[parentKey] === undefined) {
      return
    } else {
      splitKey.shift()
      return extractValueFromObject(getI18nObjectFromI18nObject(obj[parentKey]), splitKey, delimiter)
    }
  }
}

export const handleCsvWrapper = (value: string | undefined) => {
  return value && `"${value?.replace(/"/g, '""')}"`;
}