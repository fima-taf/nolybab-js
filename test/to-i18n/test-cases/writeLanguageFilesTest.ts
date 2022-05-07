import { Configuration, LanguageFile } from "../../../src/types"
import fs from 'fs'
import { writeLanguageFiles } from "../../../src/to-i18n"
import { en, es, fr } from "../../mocked-i18n-files"

export const writeLanguageFilesTest = () => {
  const mockedConf = {
    mainFileName: 'en',
    i18nFilesPath: 'src/languages',
    csvDelimiter: ','
  } as Configuration

  afterEach(() => {
    const pathExists = fs.existsSync(mockedConf.i18nFilesPath)

    if (pathExists) {
      fs.rmSync(mockedConf.i18nFilesPath, { recursive: true, force: true })
    }

  })

  test('Check the writen files', async () => {
    
    const i18nObjectFiles = {
      'en': en,
      'es': es,
      'fr': fr
    }

    const langFiles = [
      {name: 'en', file: en},
      {name: 'es', file: es},
      {name: 'fr', file: fr},
    ] as LanguageFile[]

    await writeLanguageFiles(mockedConf, langFiles)

    const i18nFilesAmount = fs.readdirSync(mockedConf.i18nFilesPath)

    i18nFilesAmount.forEach(fileName => {
      const file = fs.readFileSync(`${mockedConf.i18nFilesPath}/${fileName}`, {encoding: 'utf-8'})

      const languageName = fileName.replace('.json', '')

      expect(JSON.stringify(i18nObjectFiles[languageName as keyof typeof i18nObjectFiles])).toBe(file)
    })

  })
}