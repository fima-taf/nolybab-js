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
  csvFileName: string,
  csvDelimiter: string,
  csvFilePath: string
}

export enum FileTypes {
  CSV = 'csv',
  JSON = 'json'
}

