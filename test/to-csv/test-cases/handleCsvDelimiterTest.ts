import { handleCsvDelimiter } from "../../../src/to-csv"

export const handleCsvDelimiterTest = () => {
  const delimiter = ','

  test('Get value with delimiter', () => {
    // eslint-disable-next-line no-useless-escape
    expect(handleCsvDelimiter(`some spreaded${delimiter} value`, delimiter)).toBe('\"some spreaded, value\"')
  })

  test('Get value without delimiter', () => {
    expect(handleCsvDelimiter('some value', delimiter)).toBe('some value')
  })
  
  test('Get complex value without potential delimiter', () => {
    expect(handleCsvDelimiter('some value. and some potential delimiter;', delimiter)).toBe('some value. and some potential delimiter;')
  })

  test('Get undefined value', () => {
    expect(handleCsvDelimiter(undefined, delimiter)).toBe(undefined)
  })

}