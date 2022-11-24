import { extractKeysFromObject } from "../../../src/to-csv"
import { I18nObject } from "../../../src/types"

export const extractKeysFromObjectTest = () => {

  test('Get simple object keys', () => {
  const simpleObject = {
    key_1: 'val_1',
    key_2: 'val_2',
    key_3: 'val_3',
    key_4: 'val_4',
  }

  const expectedResult = ['key_1', 'key_2', 'key_3', 'key_4']

  expect(extractKeysFromObject(simpleObject)).toMatchObject(expectedResult)
  })

  test('Get deep object keys', () => {
    const deepObject = {
      key_1: 'val_1',
      key_2: 'val_2',
      key_3: 'val_3',
      key_4: 'val_4',
      key_5: {
        key_5_1: 'val_5_1',
        key_5_2: 'val_5_2',
        key_5_3: {
          key_5_3_1: 'val_5_3_1',
          key_5_3_2: {
            key_5_3_2_1: 'val_5_3_2_1'
          }
        }
      }
    }

    const expectedResult = ['key_1', 'key_2', 'key_3', 'key_4', 'key_5.key_5_1', 'key_5.key_5_2', 'key_5.key_5_3.key_5_3_1', 'key_5.key_5_3.key_5_3_2.key_5_3_2_1']

    expect(extractKeysFromObject(deepObject)).toMatchObject(expectedResult)
  })

  test('Get nested object key with parent', () => {
    const simpleObject = {
      key_1: 'val_1',
    }

    const expectedResult = ['parent.key_1']

    expect(extractKeysFromObject(simpleObject, 'parent')).toMatchObject(expectedResult)
  })

  /**
   * This test is ment to check that any other types other than object/string are ignored.
   * Update this test when array type will be added.
   */
  test('Ignore keys that are not object || string', () => {
    const simpleObject = {
      key_1: 'val_1',
      key_2: 123,
      key_3: {
        key_3_1: 'val_3_1'
      }
    } as I18nObject

    const expectedResult = ['key_1', 'key_3.key_3_1']

    expect(extractKeysFromObject(simpleObject)).toMatchObject(expectedResult)
})
}
