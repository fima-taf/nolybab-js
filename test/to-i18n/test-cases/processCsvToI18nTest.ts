import { Configuration, FileTypes } from "../../../src/types"
import { processCsvToI18n } from '../../../src/to-i18n'
import fs from 'fs'
import { csvContent, csvContentWithMissingKeys, de, en, es, fr } from "../../mocked-i18n-files"

export const processCsvToI18nTest = () => {
  const mockedConf = {
    mainFileName: 'en',
    i18nFilesPath: 'src/languages',
    csvFileName: 'i18n-test',
    csvFilePath: 'src/lang',
    csvDelimiter: ','
  } as Configuration

  beforeEach(() => {
    const pathExists = fs.existsSync(mockedConf.csvFilePath)

    if (pathExists) {
      fs.rmSync(mockedConf.csvFilePath, { recursive: true, force: true })
    }

    fs.mkdirSync(mockedConf.csvFilePath)
  })

  afterAll(() => {
    fs.rmSync(mockedConf.i18nFilesPath, { recursive: true, force: true })
    fs.rmSync(mockedConf.csvFilePath, { recursive: true, force: true })
  })

  afterEach(() => {
    fs.rmSync(mockedConf.csvFilePath, { recursive: true, force: true })
  })

  test('Run full csv-to-i18n process', () => {
    fs.writeFileSync(`${mockedConf.csvFilePath}/${mockedConf.csvFileName}.${FileTypes.CSV}`, csvContent)
    const i18nObjectFiles = {
      'en': en,
      'es': es,
      'fr': fr
    }

    processCsvToI18n(mockedConf)

    const newI18nFilesPath = fs.existsSync(mockedConf.i18nFilesPath)

    expect(newI18nFilesPath).toBeTruthy()

    const i18nFilesAmount = fs.readdirSync(mockedConf.i18nFilesPath)

    expect(i18nFilesAmount).toHaveLength(Object.keys(i18nObjectFiles).length)

    i18nFilesAmount.forEach(fileName => {
      const file = fs.readFileSync(`${mockedConf.i18nFilesPath}/${fileName}`, {encoding: 'utf-8'})

      const languageName = fileName.replace('.json', '')

      expect(JSON.stringify(i18nObjectFiles[languageName as keyof typeof i18nObjectFiles])).toBe(file)
    })

  })

  test('Run full csv-to-i18n process with missing keys', () => {
    fs.writeFileSync(`${mockedConf.csvFilePath}/${mockedConf.csvFileName}.${FileTypes.CSV}`, csvContentWithMissingKeys)
    const i18nObjectFiles = {
      'en': en,
      'es': es,
      'fr': fr,
      'de': de
    }

    processCsvToI18n(mockedConf)

    const newI18nFilesPath = fs.existsSync(mockedConf.i18nFilesPath)

    expect(newI18nFilesPath).toBeTruthy()

    const i18nFilesAmount = fs.readdirSync(mockedConf.i18nFilesPath)

    expect(i18nFilesAmount).toHaveLength(Object.keys(i18nObjectFiles).length)

    i18nFilesAmount.forEach(fileName => {
      const file = fs.readFileSync(`${mockedConf.i18nFilesPath}/${fileName}`, {encoding: 'utf-8'})

      const languageName = fileName.replace('.json', '')

      expect(JSON.stringify(i18nObjectFiles[languageName as keyof typeof i18nObjectFiles])).toBe(file)
    })

  })
}