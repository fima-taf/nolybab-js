import chalk from "chalk"
import { Configuration, FileTypes, LanguageFile } from "./types"
import fs from 'fs'


export const processCsvToI18n = async (conf: Configuration) => {
  console.log(chalk.blue('Starting csv-to-i18n process'))

  const csvFilePath = `${conf.csvFilePath}/${conf.csvFileName}.${FileTypes.CSV}`

  const pathExists = fs.existsSync(csvFilePath)

  if (!pathExists) {
    throw new Error(`The translations file '${conf.csvFileName}' wasn't found in '${conf.csvFilePath}'`)
  }

  const csvString = fs.readFileSync(csvFilePath).toString()

  const csvRows = convertCsvToArray(csvString, conf.csvDelimiter)

  const headers = csvRows[0]

  const emptyLangFiles = generateLangFiles(headers)

  const langFiles = convertRowsIntoObject(csvRows, emptyLangFiles)

  await writeLanguageFiles(conf, langFiles)

  console.log(chalk.blue('csv-to-i18n process has ended successfully'))
}

export const convertCsvToArray = (csv: string, csvDelimiter: string) => {
  if (csv && csv.length) {
    const result: any[] = []
    const rows = csv.split('\n')
    rows.forEach(r => {
      result.push(handleCsvDelimiter(r, csvDelimiter))
    })
    return result
  } else {
    throw new Error('The csv translations file is empty')
  }
}

export const handleCsvDelimiter = (row: string, csvDelimiter: string): string[] => {
  const values = row.split(csvDelimiter);
  const fixedValues: string[] = []
  let mergedValue = ""
  values.forEach(v => {
    if (v.startsWith('"')) {
      mergedValue = v.substring(1) + csvDelimiter;
    } else if (v.endsWith('"')) {
      mergedValue += v.substring(0, v.length - 1);
      fixedValues.push(mergedValue)
      mergedValue = ""
    } else if (mergedValue.length) {
      mergedValue += v + csvDelimiter
    } else {
      fixedValues.push(v)
    }
  })
  return fixedValues
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
      for (let j = 1; j <= langFiles.length; j++) {
        const langFilesIndex = j-1
        langFiles[langFilesIndex].file = setValueIntoObject(translationObjectKeys, row[j], langFiles[langFilesIndex].file)
      }
    }
  }
  return langFiles
}

export const convertNolybabKeyToArray = (nolybabKey: string) => {
  return nolybabKey.split('.')
}

export const setValueIntoObject = (keys: string[], value: string, object: any): any => {
  const keysCopy = Object.assign([], keys)
  const currentKey = keysCopy.shift()
  if (currentKey !== undefined) {
    if (keysCopy.length > 0) {
      object[currentKey] = setValueIntoObject(keysCopy, value, object[currentKey] || {})
    } else {
      if (value) {
        object[currentKey] = value
      }
    }
  }
  return object
}

export const writeLanguageFiles = async (conf: Configuration, langFiles: LanguageFile[]) => {

  const outputPathExists = fs.existsSync(conf.i18nFilesPath)

  if (!outputPathExists) {
    fs.mkdirSync(conf.i18nFilesPath)
  }
  
  langFiles.forEach(lf => {
    fs.writeFileSync(`${conf.i18nFilesPath}/${lf.name}.${FileTypes.JSON}`, JSON.stringify(lf.file))
  })

}