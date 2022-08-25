import { ComponentManager } from '../src/Components/ComponentManager'
import { EntityManager } from '../src/Entities/EntityManager'
import { PlayerFactory } from '../src/Entities/PlayerFactory'

test('Should increment the number of entities, and subscribe the entity to components', () => {
  const componentManager = new ComponentManager()
  const entityManager = new EntityManager()
  const playerFactory = new PlayerFactory(entityManager, componentManager)
  expect(entityManager.Entities).toBe(0)
  playerFactory.create({ x: 0, y: 0, z: 0 }, 32, 'socketId', 0, 'playerName')
  expect(entityManager.Entities).toBe(1)
})

test('Should use a recyclable entity, instead of increasing the number of entities', () => {
  const componentManager = new ComponentManager()
  const entityManager = new EntityManager()
  const playerFactory = new PlayerFactory(entityManager, componentManager)
  expect(entityManager.Entities).toBe(0)
  playerFactory.create({ x: 0, y: 0, z: 0 }, 32, 'socketId', 0, 'playerName')
  playerFactory.create({ x: 0, y: 0, z: 0 }, 32, 'socketId', 1, 'playerName')
  expect(entityManager.Entities).toBe(2)
  componentManager.subscribeEntity(1, [new Date().getTime()], componentManager.recyclableComponent)
  playerFactory.create({ x: 0, y: 0, z: 0 }, 32, 'socketId', 2, 'playerName')
  expect(entityManager.Entities).toBe(2)
  expect(componentManager.playerComponent.sparseArray[1]?.accountId).toBe(2)
})
