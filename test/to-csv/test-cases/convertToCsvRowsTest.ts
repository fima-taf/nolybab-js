import { convertToCsvRows } from "../../../src/to-csv"
import { FileTypes, LanguageFile } from "../../../src/types"

export const convertToCsvRowsTest = () => {

  test('Get simple keys csv', () => {
    const delimiter = ','
    const mainFile =  {hello: 'Hello', yes: 'Yes', no: 'No'}
    const langFiles = [
      {name: `en.${FileTypes.JSON}`, file: mainFile},
      {name: `fr.${FileTypes.JSON}`, file: {hello: 'Bonjour', yes: 'Oui', no: 'Non'}},
      {name: `es.${FileTypes.JSON}`, file: {hello: 'Hola', yes: 'Sí', no: 'No'}}
    ]

    expect(convertToCsvRows(mainFile, langFiles, delimiter)).toMatchObject([
      ['hello', 'Hello', 'Bonjour', 'Hola'],
      ['yes', 'Yes', 'Oui', 'Sí'],
      ['no', 'No', 'Non', 'No']
    ])
  })

  test('Get simple keys csv with missing keys', () => {
    const delimiter = ','
    const mainFile =  {hello: 'Hello', yes: 'Yes', no: 'No'}
    const langFiles = [
      {name: `en.${FileTypes.JSON}`, file: mainFile},
      {name: `fr.${FileTypes.JSON}`, file: {hello: 'Bonjour', yes: 'Oui', no: 'Non'}},
      {name: `es.${FileTypes.JSON}`, file: {hello: 'Hola', no: 'No'}},
      {name: `de.${FileTypes.JSON}`, file: {hello: 'Hallo', yes: 'Ja'}},
    ] as LanguageFile[]

    expect(convertToCsvRows(mainFile, langFiles, delimiter)).toMatchObject([
      ['hello', 'Hello', 'Bonjour', 'Hola', 'Hallo'],
      ['yes', 'Yes', 'Oui', undefined, 'Ja'],
      ['no', 'No', 'Non', 'No', undefined]
    ])
  })
}