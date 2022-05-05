import { extractValueFromObject } from "../../../src/to-csv"

export const extractValueFromObjectTest = () => {
  const delimiter = ','

  test('Get value with simple key', () => {
    const simpleObject = {
      key_1: 'val_1',
      key_2: 'val_2',
      key_3: 'val_3',
      key_4: 'val_4',
    }

    expect(extractValueFromObject(simpleObject, ['key_1'], delimiter)).toBe('val_1')
  })

  test('Get value with deep key', () => {
    const deepObject = {
      key_1: 'val_1',
      key_2: 'val_2',
      key_3: {
        key_3_1: 'val_3_1'
      }
    }

    expect(extractValueFromObject(deepObject, ['key_3', 'key_3_1'], delimiter)).toBe('val_3_1')
  })
}