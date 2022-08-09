import { handleCsvDelimiter } from "../../../src/to-i18n"
import { LanguageFile } from "../../../src/types"

export const handleCsvDelimiterTest = () => {
  const delimiter = ','

  test('Get simple strings from csv', () => {
    const csvRow = 'login.message,Please login,Por favor Iniciar sesión,Veuillez vous connecter'

    const expected = [
      'login.message',
      'Please login',
      'Por favor Iniciar sesión',
      'Veuillez vous connecter'
    ]

    expect(handleCsvDelimiter(csvRow, delimiter)).toEqual(expected)

  })

  test('Convert strings with delimiter inside', () => {
    const csvRow = 'home.body.description,"A nice application, recommend to your friends!","¡Una buena aplicación, recomiéndala a tus amigos!","Une belle application, recommandez à vos amis!"'

    const expected = [
      'home.body.description',
      'A nice application, recommend to your friends!',
      '¡Una buena aplicación, recomiéndala a tus amigos!',
      'Une belle application, recommandez à vos amis!'
    ]

    expect(handleCsvDelimiter(csvRow, delimiter)).toEqual(expected)

  })

  test('Convert strings with multiple delimiters inside', () => {
    const csvRows = 'home.body.description,"A nice, application, recommend to your, friends!","¡Una buena, aplicación, recomiéndala a tus, amigos!","Une belle, application, recommandez à vos, amis!"'
    

    const expected = [
      'home.body.description',
      'A nice, application, recommend to your, friends!',
      '¡Una buena, aplicación, recomiéndala a tus, amigos!',
      'Une belle, application, recommandez à vos, amis!'
    ]

    expect(handleCsvDelimiter(csvRows, delimiter)).toEqual(expected)
  })

}