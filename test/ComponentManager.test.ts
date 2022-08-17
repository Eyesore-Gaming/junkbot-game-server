import { Quat } from '../src/Quat'
import { Vec3 } from '../src/Vec3'
import { ComponentManager } from '../src/ComponentManager'
import { TransformComponent } from '../src/TransformComponent'
import { TranslationComponent } from '../src/TranslationComponent'

const data = { position: { x: 1, y: 2, z: 3 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
const newData =  { position: { x: 3, y: 4, z: 5 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }

let componentManager = new ComponentManager()
let transformComponent = new TransformComponent()

beforeEach(() => {
  componentManager = new ComponentManager()
  transformComponent = new TransformComponent()
});

test('Should subscribe an entity', () => {
  componentManager.subscribeEntity(100, transformComponent, data)
  const query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
})

test('Should not unsubscribe any entity, as an unused entity id was provided', () => {
  componentManager.subscribeEntity(0, transformComponent, data)
  componentManager.unsubscribeEntity(1, transformComponent)
  let query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
})

test('Should unsubscribe an entity, with zero remaining', () => {
  componentManager.subscribeEntity(0, transformComponent, data)
  let query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
  componentManager.unsubscribeEntity(0, transformComponent)
  query = componentManager.query(transformComponent)
  console.log(query)
  expect(query.length).toBe(0)
})

test('Subscribing to an entity that is already subscribed should update the existing entity', () => {
  let id = 2
  componentManager.subscribeEntity(id, transformComponent, data)
  expect(transformComponent.sparseArray[id]?.position.x).toBe(data.position.x)
  expect(transformComponent.sparseArray[id]?.position.y).toBe(data.position.y)
  componentManager.subscribeEntity(id, transformComponent, newData)
  expect(transformComponent.sparseArray[id]?.position.x).toBe(newData.position.x)
  expect(transformComponent.sparseArray[id]?.position.y).toBe(newData.position.y)
})

test('return only entitiy IDs that have every given component type', () => {
  const translationComponent = new TranslationComponent()

  componentManager.subscribeEntity(0, transformComponent, data)
  componentManager.subscribeEntity(1, transformComponent, data)
  componentManager.subscribeEntity(1, translationComponent, { speed: 5, direction: 180 })
  //Should return only entities with both a transformComponent and translationComponent registered to them.
  const query = componentManager.query(transformComponent, translationComponent)
  expect(query.length).toBe(1)
  expect(query[0]).toBe(1)
})

test('return zero results as an empty array', () => {
  const translationComponent = new TranslationComponent()
  const query = componentManager.query(transformComponent, translationComponent)
  expect(query.length).toBe(0)
})
