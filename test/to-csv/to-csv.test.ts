import { generateHeadersRow, getNolybabKeyName } from '../../src/to-csv'
import { handleCsvDelimiterTest } from './test-cases/handleCsvDelimiterTest'
import { extractKeysFromObjectTest } from './test-cases/extractKeysFromObjectTest'
import { convertToCsvRowsTest } from './test-cases/convertToCsvRowsTest'
import { extractValueFromObjectTest } from './test-cases/extractValueFromObjectTest'
import { loadLanguageFilesTest } from './test-cases/loadLanguageFilesTest'
import { processI18nToCsvTest } from './test-cases/processI18nToCsvTest'
import { FileTypes } from '../../src/types'

describe("I18n to CSV tests", () => {

  describe('Unit - getNolybabKeyName()', () => {

    test("Get aggregated key name with parent", () => {
      expect(getNolybabKeyName('key', 'parentKey')).toBe('parentKey.key')
    })
  
    test("Get aggregated key name without parent", () => {
      expect(getNolybabKeyName('key')).toBe('key')
    })

  })

  describe('Unit - handleCsvDelimiter()', handleCsvDelimiterTest)

  describe('Unit - extractKeysFromObject()', extractKeysFromObjectTest)

  describe('Unit - extractValueFromObject()', extractValueFromObjectTest)

  describe('Unit - generateHeadersRow()', () => {

    test('Get headers row', () => {
      const langFiles = [
        {name: `en.${FileTypes.JSON}`, file: {}},
        {name: `fr.${FileTypes.JSON}`, file: {}},
        {name: `es.${FileTypes.JSON}`, file: {}}
      ]

      expect(generateHeadersRow(langFiles)).toMatchObject(['en', 'fr', 'es'])
    })
  })
  
  describe('Unit - convertToCsv()', convertToCsvRowsTest)

  describe('Unit - loadLanguageFiles()', loadLanguageFilesTest)

  describe('Integration - processI18nToCsvTest()', processI18nToCsvTest)
})