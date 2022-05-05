import { Configuration, FileTypes } from "../../../src/types"
import { processCsvToI18n } from '../../../src/to-i18n'
import fs from 'fs'
import { csvContent, csvContentWithMissingKeys, de, en, es, fr } from "../../mocked-i18n-files"

export const processCsvToI18nTest = () => {
  const mockedConf = {
    mainFileName: 'en',
    i18nFilesPath: 'src/languages',
    translationsFileName: 'i18n-test',
    translationsFilePath: 'src/lang',
    csvDelimiter: ','
  } as Configuration

  beforeEach(() => {
    const pathExists = fs.existsSync(mockedConf.translationsFilePath)

    if (pathExists) {
      fs.rmSync(mockedConf.translationsFilePath, { recursive: true, force: true })
    }

    fs.mkdirSync(mockedConf.translationsFilePath)
  })

  afterAll(() => {
    fs.rmSync(mockedConf.i18nFilesPath, { recursive: true, force: true })
    fs.rmSync(mockedConf.translationsFilePath, { recursive: true, force: true })
  })

  afterEach(() => {
    fs.rmSync(mockedConf.translationsFilePath, { recursive: true, force: true })
  })

  test('Run full csv-to-i18n process', () => {
    fs.writeFileSync(`${mockedConf.translationsFilePath}/${mockedConf.translationsFileName}.${FileTypes.CSV}`, csvContent)
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
    fs.writeFileSync(`${mockedConf.translationsFilePath}/${mockedConf.translationsFileName}.${FileTypes.CSV}`, csvContentWithMissingKeys)
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