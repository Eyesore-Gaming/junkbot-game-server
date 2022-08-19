import { CollisionComponent } from '../src/CollisionComponent'
import { ComponentManager } from '../src/ComponentManager'
import { PhysicsSystem } from '../src/PhysicsSystem'
import { TransformComponent } from '../src/TransformComponent'
import { TranslationComponent } from '../src/TranslationComponent'

const componentManager = new ComponentManager()
componentManager.components.set('transformComponent', new TransformComponent())
componentManager.components.set('translationComponent', new TranslationComponent())
componentManager.components.set('collisionComponent', new CollisionComponent())

test('The physics system correctly moves entity 3.34 unites at 60 fps cap', () => {
  const transform = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const translation = { speed: 200, velocity: { x: 0, y: 0, z: 0 }, destination: { x: 100, y: 0, z: 0 } }
  const collision = { mesh: { radius: 5 }, type: 'sphere' }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const transformComponent = componentManager.components.get('transformComponent')
  const translationComponent = componentManager.components.get('translationComponent')
  const collisionComponent = componentManager.components.get('collisionComponent')
  if (transformComponent !== undefined && translationComponent !== undefined && collisionComponent !== undefined) {
    componentManager.subscribeEntity(0, [transform, translation, collision], transformComponent, translationComponent, collisionComponent)
  }
  physicsSystem.lastTime = 0
  physicsSystem.update(componentManager, 1)
  expect(transformComponent?.sparseArray[0].position.x).toBe(3.34)
  expect(transformComponent?.sparseArray[0].position.y).toBe(0)
  expect(transformComponent?.sparseArray[0].position.z).toBe(0)
})

test('The physics system correctly moves entity 4 units at 30 fps', () => {
  const transform = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const translation = { speed: 200, velocity: { x: 0, y: 0, z: 0 }, destination: { x: 100, y: 0, z: 0 } }
  const collision = { mesh: { radius: 5 }, type: 'sphere' }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const transformComponent = componentManager.components.get('transformComponent')
  const translationComponent = componentManager.components.get('translationComponent')
  const collisionComponent = componentManager.components.get('collisionComponent')
  if (transformComponent !== undefined && translationComponent !== undefined && collisionComponent !== undefined) {
    componentManager.subscribeEntity(0, [transform, translation, collision], transformComponent, translationComponent, collisionComponent)
  }
  physicsSystem.lastTime = 0
  physicsSystem.update(componentManager, 30)
  expect(transformComponent?.sparseArray[0].position.x).toBe(6)
  expect(transformComponent?.sparseArray[0].position.y).toBe(0)
  expect(transformComponent?.sparseArray[0].position.z).toBe(0)
})

test('The physics system correctly moves entity 20 units at 10 fps minimum', () => {
  const transform = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const translation = { speed: 200, velocity: { x: 0, y: 0, z: 0 }, destination: { x: 100, y: 0, z: 0 } }
  const collision = { mesh: { radius: 5 }, type: 'sphere' }
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const transformComponent = componentManager.components.get('transformComponent')
  const translationComponent = componentManager.components.get('translationComponent')
  const collisionComponent = componentManager.components.get('collisionComponent')
  if (transformComponent !== undefined && translationComponent !== undefined && collisionComponent !== undefined) {
    componentManager.subscribeEntity(0, [transform, translation, collision], transformComponent, translationComponent, collisionComponent)
  }
  physicsSystem.lastTime = 0
  physicsSystem.update(componentManager, 1000)
  expect(transformComponent?.sparseArray[0].position.x).toBe(20)
  expect(transformComponent?.sparseArray[0].position.y).toBe(0)
  expect(transformComponent?.sparseArray[0].position.z).toBe(0)
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

test('Circles do not intersect', () => {
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const transformA = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 0, b: 0, c: 0, d: 0 }, scale: { l: 8, w: 9, h: 10 } }
  const collisionA = { mesh: { radius: 5 }, type: 'sphere' }

  const transformB = { position: { x: 8, y: 0, z: 0 }, rotation: { a: 0, b: 0, c: 0, d: 0 }, scale: { l: 8, w: 9, h: 10 } }
  const collisionB = { mesh: { radius: 3 }, type: 'sphere' }

  const test = physicsSystem.getCirclesIntersect({ center: transformA.position, radius: collisionA.mesh.radius }, { center: transformB.position, radius: collisionB.mesh.radius })
  expect(test.collision).toBe(false)
  expect(test.depth).toBe(0)
  expect(test.normal.x).toBe(0)
  expect(test.normal.y).toBe(0)
  expect(test.normal.z).toBe(0)
})

test('Circles intersect', () => {
  const physicsSystem = new PhysicsSystem('physicsSystem')
  const transformA = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const collisionA = { mesh: { radius: 5 }, type: 'sphere' }

  const transformB = { position: { x: 8, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { l: 8, w: 9, h: 10 } }
  const collisionB = { mesh: { radius: 5 }, type: 'sphere' }

  const test = physicsSystem.getCirclesIntersect({ center: transformA.position, radius: collisionA.mesh.radius }, { center: transformB.position, radius: collisionB.mesh.radius })
  expect(test.collision).toBe(true)
  expect(test.depth).toBe(2)
  expect(test.normal.x).toBe(1)
  expect(test.normal.y).toBe(0)
  expect(test.normal.z).toBe(0)
})
