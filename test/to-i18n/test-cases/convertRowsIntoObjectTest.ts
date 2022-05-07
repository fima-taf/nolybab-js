import { convertRowsIntoObject } from "../../../src/to-i18n"
import { LanguageFile } from "../../../src/types"


export const convertRowsIntoObjectTest = () => {

  test('Get i18n objects from csv rows', () => {
    
    const rows = [
      [' ', 'en', 'es', 'fr'],
      ['hello','Hello','Hola','Bonjour'],
      ['yes','Yes','Sí','Oui'],
      ['no','No','No','Non'],
      ['login.message','Please login','Por favor Iniciar sesión','Veuillez vous connecter'],
      ['home.body.about.title','About','Acerca de','Sur']
    ]

    const langFiles = [
      {name: 'en', file: {}},
      {name: 'es', file: {}},
      {name: 'fr', file: {}},
    ] as LanguageFile[]

    const expected = [
      {name: 'en', file: {hello: 'Hello', yes: 'Yes', no: 'No', login: {message: 'Please login'}, home: {body: {about: {title: 'About'}}}}},
      {name: 'es', file: {hello: 'Hola', yes: 'Sí', no: 'No', login: {message: 'Por favor Iniciar sesión'}, home: {body: {about: {title: 'Acerca de'}}}}},
      {name: 'fr', file: {hello: 'Bonjour', yes: 'Oui', no: 'Non', login: {message: 'Veuillez vous connecter'}, home: {body: {about: {title: 'Sur'}}}}},
    ]


    expect(convertRowsIntoObject(rows, langFiles)).toEqual(expected)
  })
}