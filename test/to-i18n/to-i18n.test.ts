import { convertNolybabKeyToArray, generateLangFiles } from "../../src/to-i18n"
import { convertCsvToArrayTest } from "./test-cases/convertCsvToArrayTest"
import { processCsvToI18nTest } from "./test-cases/processCsvToI18nTest"
import { LanguageFile } from "../../src/types"
import { setValueIntoObjectTest } from "./test-cases/setValueIntoObjectTest"
import { convertRowsIntoObjectTest } from "./test-cases/convertRowsIntoObjectTest"
import { writeLanguageFilesTest } from "./test-cases/writeLanguageFilesTest"


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

    test('Get simple nolybab key', () => {
      const key = 'hello'

      const expected = ['hello']

      expect(convertNolybabKeyToArray(key)).toEqual(expected)
    })

    test('Get deep nolybab key', () => {
      const key = 'home.body.about.title'

      const expected = ['home', 'body', 'about', 'title']

      expect(convertNolybabKeyToArray(key)).toEqual(expected)
    })
  })

  describe('Unit - setValueIntoObjectTest()', setValueIntoObjectTest)

  describe('Unit - convertRowsIntoObjectTest()', convertRowsIntoObjectTest)

  describe('Unit - writeLanguageFilesTest()', writeLanguageFilesTest)
})