export type LanguageFile = {
  name: string
  file: any
}

export type MissingKeys = {
  [key: string]: {
    keys: number
  }
}

export type Configuration = {
  mainFileName: string
  i18nFilesPath: string,
  translationsFileName: string,
  csvDelimiter: string,
  translationsFilePath: string
}

export enum FileTypes {
  CSV = 'csv',
  JSON = 'json'
}

