import { I18nObject } from "./types"

export const getI18nObjectFromI18nObject = (val: I18nObject | string | number): I18nObject => {

  if (!val) {
    return {} as I18nObject
  }

  const isI18nObject = (val: I18nObject | string | number): val is I18nObject => Object.keys(val).length > 0

  return isI18nObject(val) ? val : {} as I18nObject
}

export const getStringFromI18nObject = (val: I18nObject | string | number): string | undefined => {

  const isString = (val: I18nObject | string | number): val is string => typeof val === 'string'

  return isString(val) ? val : undefined
}
