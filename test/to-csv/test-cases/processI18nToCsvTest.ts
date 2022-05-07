import { Configuration, FileTypes } from "../../../src/types"
import fs from 'fs'
import { csvContent, csvContentWithMissingKeys, de, en, es, fr } from "../../mocked-i18n-files"
import { processI18nToCsv } from "../../../src/to-csv"

export const processI18nToCsvTest = () => {
  const mockedConf = {
    mainFileName: 'en',
    i18nFilesPath: 'src/languages',
    translationsFileName: 'i18n-test',
    csvDelimiter: ','
  } as Configuration

  beforeAll(() => {
    const pathExists = fs.existsSync(mockedConf.i18nFilesPath)

    if (pathExists) {
      fs.rmSync(mockedConf.i18nFilesPath, { recursive: true, force: true })
    }

    fs.mkdirSync(mockedConf.i18nFilesPath)
    fs.writeFileSync(`${mockedConf.i18nFilesPath}/en.${FileTypes.JSON}`, JSON.stringify(en))
    fs.writeFileSync(`${mockedConf.i18nFilesPath}/fr.${FileTypes.JSON}`, JSON.stringify(fr))
    fs.writeFileSync(`${mockedConf.i18nFilesPath}/es.${FileTypes.JSON}`, JSON.stringify(es))
  })

  afterAll(() => {
    fs.rmSync(mockedConf.i18nFilesPath, { recursive: true, force: true })
  })

  afterEach(() => {
    fs.rmSync(`${mockedConf.i18nFilesPath}/${mockedConf.translationsFileName}.${FileTypes.CSV}`)
  })

  test('Run full i18n-to-csv process', () => {
    processI18nToCsv(mockedConf)

    const outputFile = fs.readFileSync(`${mockedConf.i18nFilesPath}/${mockedConf.translationsFileName}.${FileTypes.CSV}`)

    expect(outputFile).toBeTruthy()

    expect(outputFile.toString('utf-8')).toBe(csvContent)
    
  })

  test('Run full i18n-to-csv process with missing keys', () => {
    fs.writeFileSync(`${mockedConf.i18nFilesPath}/de.${FileTypes.JSON}`, JSON.stringify(de))

    processI18nToCsv(mockedConf)

    const outputFile = fs.readFileSync(`${mockedConf.i18nFilesPath}/${mockedConf.translationsFileName}.${FileTypes.CSV}`)

    expect(outputFile).toBeTruthy()

    expect(outputFile.toString('utf-8')).toBe(csvContentWithMissingKeys)
  })
}