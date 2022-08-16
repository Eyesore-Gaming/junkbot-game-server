import { Quat } from '../src/Quat'
import { Vec3 } from '../src/Vec3'
import { ComponentManager } from '../src/ComponentManager'
import { TransformComponent } from '../src/TransformComponent'
import { TranslationComponent } from '../src/TranslationComponent'

test('Should subscribe an entity', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  componentManager.subscribeEntity(1, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  const query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
})

test('Should subscribe an entity to multiple components', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  const translationComponent = new TranslationComponent()
  componentManager.subscribeEntity(1, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }, new Vec3(1, 3, 2)], transformComponent, translationComponent)
  const query = componentManager.query(transformComponent, translationComponent)
  expect(query.length).toBe(1)
})

test('Should not unsubscribe any entity, as an unused entity id was provided', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  componentManager.subscribeEntity(0, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  let query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
  componentManager.unsubscribeEntity(1, transformComponent)
  query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
})

test('Should unsubscribe an entity, with zero remaining', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  componentManager.subscribeEntity(0, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  let query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
  componentManager.unsubscribeEntity(0, transformComponent)
  query = componentManager.query(transformComponent)
  console.log(query)
  expect(query.length).toBe(0)
})

test('Should unsubscribe entity 1, with entity 2 remaining', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  componentManager.subscribeEntity(1, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  componentManager.subscribeEntity(2, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  let query = componentManager.query(transformComponent)
  expect(query.length).toBe(2)
  componentManager.unsubscribeEntity(1, transformComponent)
  query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
})

test('Should unsubscribe entity 0, with entity 1 remaining', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  componentManager.subscribeEntity(0, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  componentManager.subscribeEntity(1, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  let query = componentManager.query(transformComponent)
  expect(query.length).toBe(2)
  componentManager.unsubscribeEntity(0, transformComponent)
  query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
  expect(query[0]).toBe(1)
})

test('Should unsubscribe entity 1, with entity 0 remaining', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  componentManager.subscribeEntity(0, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  componentManager.subscribeEntity(1, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  let query = componentManager.query(transformComponent)
  expect(query.length).toBe(2)
  componentManager.unsubscribeEntity(1, transformComponent)
  query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
  expect(query[0]).toBe(0)
})

test('An entity that is subscribed should update the existing entity', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  componentManager.subscribeEntity(2, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  let query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
  expect(transformComponent.sparseArray[2]?.position.x).toBe(1)
  expect(transformComponent.sparseArray[2]?.position.y).toBe(2)
  componentManager.subscribeEntity(2, [{ position: new Vec3(3, 4, 5), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  query = componentManager.query(transformComponent)
  expect(query.length).toBe(1)
  expect(transformComponent.sparseArray[2]?.position.x).toBe(3)
  expect(transformComponent.sparseArray[2]?.position.y).toBe(4)
})

test('Query Should return entities 2 and 4', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  const translationComponent = new TranslationComponent()

  for (let i = 0; i < 5; i++) {
    componentManager.subscribeEntity(i, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  }
  componentManager.subscribeEntity(2, [new Vec3(5, 180, 0)], translationComponent)
  componentManager.subscribeEntity(4, [new Vec3(5, 180, 0)], translationComponent)
  const query = componentManager.query(transformComponent, translationComponent)
  expect(query.length).toBe(2)
  expect(query[0]).toBe(2)
  expect(query[1]).toBe(4)
})

test('Query Should return entity 4', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  const translationComponent = new TranslationComponent()

  for (let i = 0; i < 5; i++) {
    componentManager.subscribeEntity(i, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  }
  componentManager.subscribeEntity(2, [new Vec3(5, 180, 0)], translationComponent)
  componentManager.subscribeEntity(4, [new Vec3(5, 180, 0)], translationComponent)
  let query = componentManager.query(transformComponent, translationComponent)
  expect(query.length).toBe(2)
  expect(query[0]).toBe(2)
  expect(query[1]).toBe(4)
  componentManager.unsubscribeEntity(2, transformComponent)
  query = componentManager.query(transformComponent, translationComponent)
  expect(query.length).toBe(1)
  expect(query[0]).toBe(4)
})

test('Query Should return no entities', () => {
  const componentManager = new ComponentManager()
  const transformComponent = new TransformComponent()
  const translationComponent = new TranslationComponent()

  for (let i = 0; i < 5; i++) {
    componentManager.subscribeEntity(i, [{ position: new Vec3(1, 2, 3), rotation: new Quat(1, 2, 3, 4), scale: new Vec3(1, 2, 3) }], transformComponent)
  }
  componentManager.subscribeEntity(2, [new Vec3(5, 180, 0)], translationComponent)
  componentManager.subscribeEntity(4, [new Vec3(5, 180, 0)], translationComponent)
  let query = componentManager.query(transformComponent, translationComponent)
  expect(query.length).toBe(2)
  expect(query[0]).toBe(2)
  expect(query[1]).toBe(4)
  componentManager.unsubscribeEntity(2, transformComponent)
  componentManager.unsubscribeEntity(4, translationComponent)
  query = componentManager.query(transformComponent, translationComponent)
  expect(query.length).toBe(0)
})
