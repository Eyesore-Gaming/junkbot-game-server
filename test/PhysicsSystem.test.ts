import { ComponentManager } from '../src/Components/ComponentManager'
import { PhysicsSystem } from '../src/Systems/PhysicsSystem'

test('The physics system correctly moves entity 20 units at 60 fps cap', () => {
  const componentManager = new ComponentManager()
  const transform = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const translation = { speed: 200, velocity: { x: 0, y: 0, z: 0 }, destination: { x: 100, y: 0, z: 0 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  componentManager.subscribeEntity(0, [transform, translation], componentManager.transformComponent, componentManager.translationComponent)
  physicsSystem.update(0)
  expect(componentManager.transformComponent.sparseArray[0]?.position.x).toBe(3.34)
  expect(componentManager.transformComponent.sparseArray[0]?.position.y).toBe(0)
  expect(componentManager.transformComponent.sparseArray[0]?.position.z).toBe(0)
})

test('The physics system correctly moves entity 10 units at 30 fps', () => {
  const componentManager = new ComponentManager()
  const transform = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const translation = { speed: 200, velocity: { x: 0, y: 0, z: 0 }, destination: { x: 100, y: 0, z: 0 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  componentManager.subscribeEntity(0, [transform, translation], componentManager.transformComponent, componentManager.translationComponent)
  physicsSystem.update(0.05)
  expect(componentManager.transformComponent.sparseArray[0]?.position.x).toBe(10)
  expect(componentManager.transformComponent.sparseArray[0]?.position.y).toBe(0)
  expect(componentManager.transformComponent.sparseArray[0]?.position.z).toBe(0)
})

test('The physics system correctly moves entity 20 units at 10 fps minimum', () => {
  const componentManager = new ComponentManager()
  const transform = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const translation = { speed: 200, velocity: { x: 0, y: 0, z: 0 }, destination: { x: 100, y: 0, z: 0 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  componentManager.subscribeEntity(0, [transform, translation], componentManager.transformComponent, componentManager.translationComponent)
  physicsSystem.update(1)
  expect(componentManager.transformComponent.sparseArray[0]?.position.x).toBe(20)
  expect(componentManager.transformComponent.sparseArray[0]?.position.y).toBe(0)
  expect(componentManager.transformComponent.sparseArray[0]?.position.z).toBe(0)
})

test('An entity that collides with a static entity is the only one shifted away', () => {
  const componentManager = new ComponentManager()
  const transformA = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const translationA = { speed: 0, velocity: { x: 0, y: 0, z: 0 }, destination: { x: 0, y: 0, z: 0 } }
  const collisionA = { mesh: { radius: 5 }, solid: true, static: true }

  const transformB = { position: { x: 8, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const translationB = { speed: 0, velocity: { x: 0, y: 0, z: 0 }, destination: { x: 0, y: 0, z: 0 } }
  const collisionB = { mesh: { radius: 5 }, solid: true, static: false }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  componentManager.subscribeEntity(0, [transformA, translationA, collisionA], componentManager.transformComponent, componentManager.translationComponent, componentManager.collisionComponent)
  componentManager.subscribeEntity(1, [transformB, translationB, collisionB], componentManager.transformComponent, componentManager.translationComponent, componentManager.collisionComponent)
  physicsSystem.update(1)
  expect(componentManager.transformComponent.sparseArray[0]?.position.x).toBe(0)
  expect(componentManager.transformComponent.sparseArray[0]?.position.y).toBe(0)
  expect(componentManager.transformComponent.sparseArray[0]?.position.z).toBe(0)

  expect(componentManager.transformComponent.sparseArray[1]?.position.x).toBe(10)
  expect(componentManager.transformComponent.sparseArray[1]?.position.y).toBe(0)
  expect(componentManager.transformComponent.sparseArray[1]?.position.z).toBe(0)
})

test('getLength math works', () => {
  const componentManager = new ComponentManager()
  const data = { position: { x: 4, y: 4, z: 2 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const length = physicsSystem.getLength(data.position)
  expect(length).toBe(6)
})

test('getDistance math works', () => {
  const componentManager = new ComponentManager()
  const data = { position: { x: 1, y: 1, z: 1 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const data2 = { position: { x: 5, y: 5, z: 3 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const distance = physicsSystem.getDistance(data.position, data2.position)
  expect(distance).toBe(6)
})

test('getNormalize math works', () => {
  const componentManager = new ComponentManager()
  const data = { position: { x: 3, y: 1, z: 2 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const normal = physicsSystem.getNormalize(data.position)
  expect(normal.x.toFixed(3)).toBe('0.802')
  expect(normal.y.toFixed(3)).toBe('0.267')
  expect(normal.z.toFixed(3)).toBe('0.535')
})

test('getNormalize with x = 0', () => {
  const componentManager = new ComponentManager()
  const data = { position: { x: 0, y: 1, z: 1 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const normal = physicsSystem.getNormalize(data.position)
  expect(normal.x.toFixed(3)).toBe('0.000')
  expect(normal.y.toFixed(3)).toBe('0.707')
  expect(normal.z.toFixed(3)).toBe('0.707')
})

test('getNormalize with y = 0', () => {
  const componentManager = new ComponentManager()
  const data = { position: { x: 1, y: 0, z: 1 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const normal = physicsSystem.getNormalize(data.position)
  expect(normal.x.toFixed(3)).toBe('0.707')
  expect(normal.y.toFixed(3)).toBe('0.000')
  expect(normal.z.toFixed(3)).toBe('0.707')
})

test('getNormalize with z = 0', () => {
  const componentManager = new ComponentManager()
  const data = { position: { x: 1, y: 1, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const normal = physicsSystem.getNormalize(data.position)
  expect(normal.x.toFixed(3)).toBe('0.707')
  expect(normal.y.toFixed(3)).toBe('0.707')
  expect(normal.z.toFixed(3)).toBe('0.000')
})

test('getDot math works', () => {
  const componentManager = new ComponentManager()
  const data = { position: { x: 4, y: 3, z: 3 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const data2 = { position: { x: 8, y: 6, z: 6 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const dot = physicsSystem.getDot(data.position, data2.position)
  expect(dot).toBe(68)
})

test('getCross math works', () => {
  const componentManager = new ComponentManager()
  const data = { position: { x: 2, y: 3, z: 4 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const data2 = { position: { x: 5, y: 6, z: 7 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const cross = physicsSystem.getCross(data.position, data2.position)
  expect(cross.x).toBe(-3)
  expect(cross.y).toBe(6)
  expect(cross.z).toBe(-3)
})

test('Circles do not intersect', () => {
  const componentManager = new ComponentManager()
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const transformA = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 0, b: 0, c: 0, d: 0 }, scale: { x: 8, y: 9, z: 10 } }
  const collisionA = { mesh: { radius: 5 }, solid: true, static: false }

  const transformB = { position: { x: 8, y: 0, z: 0 }, rotation: { a: 0, b: 0, c: 0, d: 0 }, scale: { x: 8, y: 9, z: 10 } }
  const collisionB = { mesh: { radius: 3 }, solid: true, static: false }

  const test = physicsSystem.getCirclesIntersect({ center: transformA.position, radius: collisionA.mesh.radius }, { center: transformB.position, radius: collisionB.mesh.radius })
  expect(test.collision).toBe(false)
  expect(test.depth).toBe(0)
  expect(test.normal.x).toBe(0)
  expect(test.normal.y).toBe(0)
  expect(test.normal.z).toBe(0)
})

test('Circles intersect', () => {
  const componentManager = new ComponentManager()
  const physicsSystem = new PhysicsSystem('physicsSystem', componentManager)
  const transformA = { position: { x: 0, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const collisionA = { mesh: { radius: 5 }, solid: true, static: false }

  const transformB = { position: { x: 8, y: 0, z: 0 }, rotation: { a: 4, b: 5, c: 6, d: 7 }, scale: { x: 8, y: 9, z: 10 } }
  const collisionB = { mesh: { radius: 5 }, solid: true, static: false }

  const test = physicsSystem.getCirclesIntersect({ center: transformA.position, radius: collisionA.mesh.radius }, { center: transformB.position, radius: collisionB.mesh.radius })
  expect(test.collision).toBe(true)
  expect(test.depth).toBe(2)
  expect(test.normal.x).toBe(1)
  expect(test.normal.y).toBe(0)
  expect(test.normal.z).toBe(0)
})
