import { Configuration, ConfigurationProperties, ConfigurationProperty, FileTypes } from "./types"

const i18nMainFileName: ConfigurationProperty = {
  name: 'i18n-main-file-name',
  alias: 'm',
  fixers: [
    (o: string) => o.replace(`.${FileTypes.JSON}`, '')
  ]
}
const i18nFilesPath: ConfigurationProperty = {
  name: 'i18n-files-path',
  alias: 'i',
  fixers: [
    (o: string) => o.startsWith('/') ?  o.slice(1) : o,
    (o: string) => o.endsWith('/') ?  o.slice(0, -1) : o
  ]
}
const csvDelimiter: ConfigurationProperty = {
  name: 'csv-delimiter',
  alias: 'c',
  fixers: undefined
}
const csvFileName: ConfigurationProperty = {
  name: 'csv-file-name',
  alias: 'n',
  fixers: [
    (o: string) => o.replace(`.${FileTypes.CSV}`, '')
  ]
}
const csvFilePath: ConfigurationProperty = {
  name: 'csv-file-path',
  alias: 'p',
  fixers: [
    (o: string) => o.startsWith('/') ?  o.slice(1) : o,
    (o: string) => o.endsWith('/') ?  o.slice(0, -1) : o
  ]
}

export const configurationProperties: ConfigurationProperties = { i18nMainFileName, i18nFilesPath, csvDelimiter, csvFileName, csvFilePath }

export const getFixedConfiguration = (options: any) => {
  const config: Configuration = {
    mainFileName: fixConfigurationValue(options[configurationProperties.i18nMainFileName.name], configurationProperties.i18nMainFileName),
    i18nFilesPath: fixConfigurationValue(options[configurationProperties.i18nFilesPath.name], configurationProperties.i18nFilesPath),
    csvDelimiter: fixConfigurationValue(options[configurationProperties.csvDelimiter.name], configurationProperties.csvDelimiter),
    csvFileName: fixConfigurationValue(options[configurationProperties.csvFileName.name], configurationProperties.csvFileName),
    csvFilePath: fixConfigurationValue(options[configurationProperties.csvFilePath.name], configurationProperties.csvFilePath)
  }
  return config
}

const fixConfigurationValue = (value: string, confProp: ConfigurationProperty): string => {
  let resultValue = value
  if (confProp.fixers) {
    for (const fixer of confProp.fixers) {
      resultValue = fixer(resultValue)
    }
  }
  return resultValue
}