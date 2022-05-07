import { setValueIntoObject } from "../../../src/to-i18n"

export const setValueIntoObjectTest = () => {

  test('Convert simple key-value into empty object', () => {

    const keys = ['hello']
    const value = 'Hello'
    const object = {}

    const expected = {hello: 'Hello'}

    expect(setValueIntoObject(keys, value, object)).toEqual(expected)
  })

  test('Convert simple key-value into populated object', () => {

    const keys = ['hello']
    const value = 'Hello'
    const object = {yes: 'Yes'}

    const expected = {yes: 'Yes', hello: 'Hello'}

    expect(setValueIntoObject(keys, value, object)).toEqual(expected)
  })

  test('Convert deep key-value into empty object', () => {

    const keys = ['home', 'body', 'about', 'title']
    const value = 'About'
    const object = {}

    const expected = {home: {body: {about: {title: 'About'}}}}

    expect(setValueIntoObject(keys, value, object)).toEqual(expected)
  })

  test('Convert deep key-value into populated object', () => {

    const keys = ['home', 'body', 'about', 'title']
    const value = 'About'
    const object = {hallo: 'Hello', login: {title: 'Login'}}

    const expected = {hallo: 'Hello', login: {title: 'Login'}, home: {body: {about: {title: 'About'}}}}

    expect(setValueIntoObject(keys, value, object)).toEqual(expected)
  })
}