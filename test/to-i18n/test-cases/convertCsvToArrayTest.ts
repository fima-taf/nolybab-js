import { convertCsvToArray } from '../../../src/to-i18n'


export const convertCsvToArrayTest = () => {

  const delimiter = ','

  test('Get rows from simple keys csv', () => {
    const simpleKeysCsv = ' ,en,es,fr\nhello,Hello,Hola,Bonjour\nyes,Yes,Sí,Oui\nno,No,No,Non'

    const expecedResult = [
      [' ', 'en', 'es', 'fr'],
      ['hello', 'Hello', 'Hola', 'Bonjour'],
      ['yes', 'Yes', 'Sí', 'Oui'],
      ['no', 'No', 'No', 'Non']
    ]

    expect(convertCsvToArray(simpleKeysCsv, delimiter)).toEqual(expecedResult)
  })

  test('Get rows from deep keys csv', () => {
    const simpleKeysCsv = ' ,en,es,fr\nhello,Hello,Hola,Bonjour\nyes,Yes,Sí,Oui\nno,No,No,Non\nlogin.title,Login,Acceso,Connexion\nlogin.message,Please login,Por favor Iniciar sesión,Veuillez vous connecter\nhome.description,Welcome to Nolybab,Bienvenido a nolybab,Bienvenue sur Nolybab\nhome.header.title,Nolybab,Nolybab,Nolybab\nhome.footer.credit,2022 Nolybab,2022 Nolybab,2022 Nolybab\nhome.body.about.title,About,Acerca de,Sur\nhome.body.contact_us,Contact us,Contacta con nosotros,Nous contacter\nhome.body.description,"A nice application, recommend to your friends!","¡Una buena aplicación, recomiéndala a tus amigos!","Une belle application, recommandez à vos amis!"'

    const expecedResult = [
      [' ','en','es','fr',],
      ['hello','Hello','Hola','Bonjour',],
      ['yes','Yes','Sí','Oui',],
      ['no','No','No','Non',],
      ['login.title','Login','Acceso','Connexion',],
      ['login.message','Please login','Por favor Iniciar sesión','Veuillez vous connecter',],
      ['home.description','Welcome to Nolybab','Bienvenido a nolybab','Bienvenue sur Nolybab',],
      ['home.header.title','Nolybab','Nolybab','Nolybab',],
      ['home.footer.credit','2022 Nolybab','2022 Nolybab','2022 Nolybab',],
      ['home.body.about.title','About','Acerca de','Sur',],
      ['home.body.contact_us','Contact us','Contacta con nosotros','Nous contacter',],
      ['home.body.description', 'A nice application, recommend to your friends!','¡Una buena aplicación, recomiéndala a tus amigos!','Une belle application, recommandez à vos amis!'],
    ]

    expect(convertCsvToArray(simpleKeysCsv, delimiter)).toEqual(expecedResult)
  })

  test('Get error if file is empty', () => {
    expect(() => convertCsvToArray('', delimiter)).toThrow(Error)
  })
}