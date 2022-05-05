import chalk from "chalk"
import { Configuration, FileTypes, LanguageFile } from "./types"
import fs, { writeFileSync } from 'fs'


export const processCsvToI18n = async (conf: Configuration) => {
  console.log(chalk.blue('Starting csv-to-json process'))

  const translationsFilePath = `${conf.translationsFilePath}/${conf.translationsFileName}.${FileTypes.CSV}`

  const pathExists = fs.existsSync(translationsFilePath)

  if (!pathExists) {
    throw new Error(`The translations file ${conf.translationsFileName} wasn't found in ${conf.translationsFilePath}`)
  }

  const csvString = fs.readFileSync(translationsFilePath).toString()

  const csvRows = convertCsvToArray(csvString, conf.csvDelimiter)

  const headers = csvRows[0]

  const emptyLangFiles = generateLangFiles(headers)

  const langFiles = convertRowsIntoObject(csvRows, emptyLangFiles)

  await writeLanguageFiles(conf, langFiles)

  console.log(chalk.blue('csv-to-json process has ended successfully'))
}

export const convertCsvToArray = (csv: string, csvDelimiter: string) => {
  if (csv && csv.length) {
    const result: any[] = []
    const rows = csv.split('\n')
    rows.forEach(r => {
      result.push(r.split(csvDelimiter))
    })
    return result
  } else {
    throw new Error('The csv translations file is empty')
  }
}

export const generateLangFiles = (headers: string[]) => {
  const result: LanguageFile[] = []
  headers.forEach(h => {
    if (!!h.trim()) {
      result.push({name: h, file: {}} as LanguageFile)
    }
  })
  return result
}

export const convertRowsIntoObject = (rows: any[], langFiles: LanguageFile[]) => {
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (row[0]) {
      const translationObjectKeys = convertNolybabKeyToArray(row[0])
      for (let j = 1; j < row.length; j++) {
        const langFilesIndex = j-1
        langFiles[langFilesIndex].file = convertStringKeysToObjectKeys(translationObjectKeys, row[j], langFiles[langFilesIndex].file)
      }
    }
  }
  return langFiles
}

export const convertNolybabKeyToArray = (nolybabKey: string) => {
  return nolybabKey.split('.')
}

export const convertStringKeysToObjectKeys = (keys: string[], value: string, object: any): any => {
  const keysCopy = Object.assign([], keys)
  const currentKey = keysCopy.shift()
  if (currentKey !== undefined) {
    if (keysCopy.length > 0) {
      object[currentKey] = convertStringKeysToObjectKeys(keysCopy, value, object[currentKey] || {})
    } else {
      if (value) {
        object[currentKey] = value
      }
    }
  }
  return object
}

export const writeLanguageFiles = async (conf: Configuration, langFiles: LanguageFile[]) => {
  const writeFilePromiseList: any[] = []

  const outputPathExists = fs.existsSync(conf.i18nFilesPath)

  if (outputPathExists) {
    fs.rmSync(conf.i18nFilesPath, { recursive: true, force: true })
  }

  fs.mkdirSync(conf.i18nFilesPath)
  
  langFiles.forEach(lf => {
    // writeFilePromiseList.push(writeFilePromise(conf, lf))
    fs.writeFileSync(`${conf.i18nFilesPath}/${lf.name}.${FileTypes.JSON}`, JSON.stringify(lf.file))
  })

  // await Promise.all<any[]>(writeFilePromiseList)
}

const writeFilePromise = (conf: Configuration, lf: LanguageFile) => {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(`${conf.i18nFilesPath}/${lf.name}.${FileTypes.JSON}`, JSON.stringify(lf.file), (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}