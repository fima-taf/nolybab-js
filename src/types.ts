import { Arguments, CamelCaseKey } from "yargs"

export type LanguageFile = {
  name: string
  file: I18nObject
}

export type I18nObject = {
  [key: string]: I18nObject | string | number
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

export type ConfigurationProperty = {
  name: string,
  alias: string,
  fixers?: ((option: string) => string)[]
}

export type ConfigurationProperties = {
  i18nMainFileName: ConfigurationProperty
  i18nFilesPath: ConfigurationProperty,
  csvFileName: ConfigurationProperty,
  csvDelimiter: ConfigurationProperty,
  csvFilePath: ConfigurationProperty
}

export type ArgvOptions = {
  [key: string]: string
}