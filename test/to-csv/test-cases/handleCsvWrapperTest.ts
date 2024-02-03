import { handleCsvWrapper } from "../../../src/to-csv"

export const handleCsvWrapperTest = () => {
  const delimiter = ','

  test('Get value with delimiter', () => {
    // eslint-disable-next-line no-useless-escape
    expect(handleCsvWrapper(`some spreaded${delimiter} value`)).toBe('"some spreaded, value"')
  })

  test('Get value without delimiter', () => {
    expect(handleCsvWrapper('some value')).toBe('"some value"')
  })
  
  test('Get complex value without potential delimiter', () => {
    expect(handleCsvWrapper('some value. and some potential delimiter;')).toBe('"some value. and some potential delimiter;"')
  })

  test('Get undefined value', () => {
    expect(handleCsvWrapper(undefined)).toBe(undefined)
  })

}