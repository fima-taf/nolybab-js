import chalk from "chalk"
import { Configuration, FileTypes, LanguageFile, I18nObject } from "./types"
import fs from 'fs'
import { getI18nObjectFromI18nObject } from "./Helpers"


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
    const result: string[][] = []
    const rows = csv.split('\n')
    rows.forEach(r => {
      result.push(handleCsvData(r, csvDelimiter))
    })
    return result
  } else {
    throw new Error('The csv translations file is empty')
  }
}

//@see https://gist.github.com/rakeden/508ca124fabe97eba6d5734f2efcea32
export const handleCsvData = (row: string, csvDelimiter: string) => {
  csvDelimiter = (csvDelimiter || ",");

  const csvRegex = new RegExp(
      (
          // Delimiters.
          "(\\" + csvDelimiter + "|\\r?\\n|\\r|^)" +

          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

          // Standard fields.
          "([^\"\\" + csvDelimiter + "\\r\\n]*))"
      ),
      "gi"
  );

  const arrData: string[] = [];

  let arrMatches = null;

  while ((arrMatches = csvRegex.exec(row))) {
    let strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {

      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"),
          "\""
      );

    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }

    arrData.push(strMatchedValue);
  }

  return arrData;
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

export const convertRowsIntoObject = (rows: string[][], langFiles: LanguageFile[]) => {
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

export const setValueIntoObject = (keys: string[], value: string, obj: I18nObject): I18nObject => {
  const keysCopy = Object.assign([] as string[], keys)
  const currentKey = keysCopy.shift()
  if (currentKey !== undefined) {
    if (keysCopy.length > 0) {
      obj[currentKey] = setValueIntoObject(keysCopy, value, getI18nObjectFromI18nObject(obj[currentKey]))
    } else {
      if (value) {
        obj[currentKey] = value
      }
    }
  }
  return obj
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