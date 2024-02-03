import { handleCsvData } from "../../../src/to-i18n"

export const handleCsvDataTest = () => {
  const delimiter = ','

  test('Get simple strings from csv', () => {
    const csvRow = 'login.message,Please login,Por favor Iniciar sesión,Veuillez vous connecter'

    const expected = [
      'login.message',
      'Please login',
      'Por favor Iniciar sesión',
      'Veuillez vous connecter'
    ]

    expect(handleCsvData(csvRow, delimiter)).toEqual(expected)

  })

  test('Convert strings with delimiter inside', () => {
    const csvRow = 'home.body.description,"A nice application, recommend to your friends!","¡Una buena aplicación, recomiéndala a tus amigos!","Une belle application, recommandez à vos amis!"'

    const expected = [
      'home.body.description',
      'A nice application, recommend to your friends!',
      '¡Una buena aplicación, recomiéndala a tus amigos!',
      'Une belle application, recommandez à vos amis!'
    ]

    expect(handleCsvData(csvRow, delimiter)).toEqual(expected)

  })

  test('Convert strings with multiple delimiters inside', () => {
    const csvRows = 'home.body.description,"A nice, application, recommend to your, friends!","¡Una buena, aplicación, recomiéndala a tus, amigos!","Une belle, application, recommandez à vos, amis!"'
    

    const expected = [
      'home.body.description',
      'A nice, application, recommend to your, friends!',
      '¡Una buena, aplicación, recomiéndala a tus, amigos!',
      'Une belle, application, recommandez à vos, amis!'
    ]

    expect(handleCsvData(csvRows, delimiter)).toEqual(expected)
  })

}