import { CollisionComponent } from '../src/CollisionComponent'
import { ComponentManager } from '../src/ComponentManager'
import { PhysicsSystem } from '../src/PhysicsSystem'
import { TransformComponent } from '../src/TransformComponent'
import { TranslationComponent } from '../src/TranslationComponent'

const componentManager = new ComponentManager()
componentManager.components.set('transformComponent', new TransformComponent())
componentManager.components.set('translationComponent', new TranslationComponent())
componentManager.components.set('collisionComponent', new CollisionComponent())

test('The physics system correctly moves 1 entity ', () => {
  const data = { position: { x: 4, y: 3, z: 3 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const transformComponent = componentManager.components.get('transformComponent')
  const translationComponent = componentManager.components.get('translationComponent')
  const collisionComponent = componentManager.components.get('collisionComponent')
  if (transformComponent !== undefined && translationComponent !== undefined && collisionComponent !== undefined) {
    componentManager.subscribeEntity(0, [data], transformComponent, translationComponent, collisionComponent)
  }
  physicsSystem.update(componentManager, 5)
  expect(physicsSystem.previousUpdate).toBe(5)
})

test('getLength math works', () => {
  const data = { position: { x: 4, y: 4, z: 2 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const length = physicsSystem.getLength(data.position)
  expect(length).toBe(6)
})

test('getDistance math works', () => {
  const data = { position: { x: 1, y: 1, z: 1 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const data2 = { position: { x: 5, y: 5, z: 3 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const distance = physicsSystem.getDistance(data.position, data2.position)
  expect(distance).toBe(6)
})

test('getNormalize math works', () => {
  const data = { position: { x: 3, y: 1, z: 2 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const normal = physicsSystem.getNormalize(data.position)
  expect(normal.x.toFixed(3)).toBe('0.802')
  expect(normal.y.toFixed(3)).toBe('0.267')
  expect(normal.z.toFixed(3)).toBe('0.535')
})

test('getDot math works', () => {
  const data = { position: { x: 4, y: 3, z: 3 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const data2 = { position: { x: 8, y: 6, z: 6 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const dot = physicsSystem.getDot(data.position, data2.position)
  expect(dot).toBe(68)
})

test('getCross math works', () => {
  const data = { position: { x: 2, y: 3, z: 4 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const data2 = { position: { x: 5, y: 6, z: 7 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const cross = physicsSystem.getCross(data.position, data2.position)
  expect(cross.x).toBe(-3)
  expect(cross.y).toBe(6)
  expect(cross.z).toBe(-3)
})
