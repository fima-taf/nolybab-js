import fs from 'fs'
import { loadLanguageFiles } from '../../../src/to-csv'
import { FileTypes, LanguageFile } from '../../../src/types'
import { en, es, fr } from '../../mocked-i18n-files'


export const loadLanguageFilesTest = () => {
  const dir = 'src/test-folder'

  beforeAll(() => {
    const pathExists = fs.existsSync(dir)

    if (pathExists) {
      fs.rmSync(dir, { recursive: true, force: true })
    }

    fs.mkdirSync(dir)
    fs.writeFileSync(`${dir}/en.${FileTypes.JSON}`, JSON.stringify(en))
    fs.writeFileSync(`${dir}/fr.${FileTypes.JSON}`, JSON.stringify(fr))
    fs.writeFileSync(`${dir}/es.${FileTypes.JSON}`, JSON.stringify(es))
  })

  afterAll(() => {
    fs.rmSync(dir, { recursive: true, force: true })
  })

  test('Get language file objects', () => {
    const expecedResult = [
			{name: `en.${FileTypes.JSON}`, file: en},
			{name: `es.${FileTypes.JSON}`, file: es},
			{name: `fr.${FileTypes.JSON}`, file: fr},
		] as LanguageFile[]

    expect(loadLanguageFiles(dir)).toMatchObject(expecedResult)
  })
}

