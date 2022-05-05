import { generateLangFiles } from "../../src/to-i18n"
import { convertCsvToArrayTest } from "./test-cases/convertCsvToArrayTest"
import { processCsvToI18nTest } from "./test-cases/processCsvToI18nTest"
import { LanguageFile } from "../../src/types"


describe('CSV to i18n tests', () => {
  
  describe('Integration - processCsvToI18nTest()', processCsvToI18nTest)

  describe('Unit - convertCsvToArrayTest()', convertCsvToArrayTest)

  describe('Unit - generateLangFiles()', () => {

    test('Get language files', () => {
      const headers = [' ', 'en', 'es', 'fr']

      const expected = [{name: 'en', file: {}}, {name: 'es', file: {}}, {name: 'fr', file: {}}] as LanguageFile[]

      expect(generateLangFiles(headers)).toEqual(expected)
    })
  })

  describe('Unit - convertNolybabKeyToArray()', () => {

    test('Get simple ', () => {
      const headers = [' ', 'en', 'es', 'fr']

      const expected = [{name: 'en', file: {}}, {name: 'es', file: {}}, {name: 'fr', file: {}}] as LanguageFile[]

      expect(generateLangFiles(headers)).toEqual(expected)
    })
  })
})