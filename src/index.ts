#!/usr/bin/env node

import yargs from 'yargs'
import chalk from 'chalk'
import { processI18nToCsv } from './to-csv'
import { Configuration } from './types'
import { processCsvToI18n } from './to-i18n';


const main = async () => {

  const options = 
    yargs
   .usage("Usage: -a <action>")
   .option('a', { alias: 'action', describe: 'The action to be executed. to-csv | to-i18n', type: 'string', demandOption: true})
   .option('m', { alias: 'i18n-main-file-name', describe: "The name of the main i18n file", type: 'string', default: 'en'})
   .option('i', { alias: 'i18n-files-path', describe: "The path to the i18n files", type: 'string', default: 'src/languages'})
   .option('c', { alias: 'csv-delimiter', describe: "The csv delimiter", type: 'string', default: ','})
   .option('n', { alias: 'translations-file-name', describe: "The name of the csv translations file", type: 'string', default: 'nolybab'})
   .option('p', { alias: 'translations-file-path', describe: "The path to the csv translations file", type: 'string', default: 'src/languages'})
   .argv;
  
  const optionsResult = await options

  const configuration = {
    mainFileName: optionsResult.m,
    i18nFilesPath: optionsResult.i,
    translationsFileName: optionsResult.n,
    csvDelimiter: optionsResult.c,
    translationsFilePath: optionsResult.p
  } as Configuration
  
  try {
    if (optionsResult.a === 'to-csv') {
      processI18nToCsv(configuration)
    } else if (optionsResult.a === 'to-i18n') {
      processCsvToI18n(configuration)
    } else {
      throw new Error('No valid action found. The available actions are: to-csv | to-i18n')
    }

  } catch (error) {
    console.log(chalk.red(error))
    process.exit(1)
  }
}

main()

