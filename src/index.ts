#!/usr/bin/env node

import yargs from 'yargs'
import chalk from 'chalk'
import { processI18nToCsv } from './to-csv'
import { processCsvToI18n } from './to-i18n';
import { configurationProperties as confProps, getFixedConfiguration } from './configurationsHelper';


export const main = async () => {

  const options = 
    yargs
   .usage("Usage: -a <action>")
   .option('action', { alias: 'a', describe: 'The action to be executed. to-csv | to-i18n', type: 'string', demandOption: true})
   .option(confProps.i18nMainFileName.name, { alias: confProps.i18nMainFileName.alias, describe: "The name of the main i18n file", type: 'string', default: 'en'})
   .option(confProps.i18nFilesPath.name, { alias: confProps.i18nFilesPath.alias, describe: "The path to the i18n files", type: 'string', default: 'src/languages'})
   .option(confProps.csvDelimiter.name, { alias: confProps.csvDelimiter.alias, describe: "The csv delimiter", type: 'string', default: ','})
   .option(confProps.csvFileName.name, { alias: confProps.csvFileName.alias, describe: "The name of the csv translations file", type: 'string', default: 'nolybab'})
   .option(confProps.csvFilePath.name, { alias: confProps.csvFilePath.alias, describe: "The path to the csv translations file", type: 'string', default: 'src/languages'})
   .argv;
  
  const optionsResult = await options

  const configuration = getFixedConfiguration(optionsResult)
  
  try {
    if (optionsResult.a === 'to-csv') {
      processI18nToCsv(configuration)
    } else if (optionsResult.a === 'to-i18n') {
      await processCsvToI18n(configuration)
    } else {
      throw new Error('No valid action found. The available actions are: to-csv | to-i18n')
    }

  } catch (error) {
    console.log(chalk.red(error))
    process.exit(1)
  }
}

main()

