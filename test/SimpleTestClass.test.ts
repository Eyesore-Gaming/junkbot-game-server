import { SimpleTestClass } from '../src/SimpleTestClass'

const initialName = 'New Name'
const initialHealth = 1
const initialMana = 2
const newName = 'Test Name'
const newHealth = 100
const newMana = 150
const testClass = new SimpleTestClass(initialName, initialHealth, initialMana)

test(`Initial testClass.Name should be ${initialName} `, () => {
  expect(testClass.Name).toBe(initialName)
})

test(`Initial testClass.Health should be ${initialHealth} `, () => {
  expect(testClass.Name).toBe(initialName)
})

test(`Initial testClass.Mana should be ${initialMana} `, () => {
  expect(testClass.Name).toBe(initialName)
})

test('testClass.Name(\'\') should should throw error', () => {
  function invalidName (): void {
    testClass.Name = ''
  }

  expect(invalidName).toThrowError()
})

test(`testClass.Name(${newName}) should update testClass.Name `, () => {
  testClass.Name = newName
  expect(testClass.Name).toBe(newName)
})

test('testClass.Health(-1) should should throw error', () => {
  function invalidHealth (): void {
    testClass.Health = -1
  }

  expect(invalidHealth).toThrowError()
})

test(`testClass.Health(${newHealth}) should update testClass.Health `, () => {
  testClass.Health = newHealth
  expect(testClass.Health).toBe(newHealth)
})

test('testClass.Mana(-1) should should throw error', () => {
  function invalidMana (): void {
    testClass.Mana = -1
  }

  expect(invalidMana).toThrowError()
})

test(`testClass.Mana(${newMana}) should update testClass.Mana `, () => {
  testClass.Mana = newMana
  expect(testClass.Mana).toBe(newMana)
})
