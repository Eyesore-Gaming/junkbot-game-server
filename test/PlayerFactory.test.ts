import { CommandComponent } from '../src/Components/CommandComponent'
import { PlayerComponent } from '../src/Components/PlayerComponent'
import { RecyclableComponent } from '../src/Components/RecyclableComponent'
import { RenderComponent } from '../src/Components/RenderComponent'
import { CollisionComponent } from '../src/Components/CollisionComponent'
import { ComponentManager } from '../src/Components/ComponentManager'
import { TransformComponent } from '../src/Components/TransformComponent'
import { TranslationComponent } from '../src/Components/TranslationComponent'
import { EntityManager } from '../src/Entities/EntityManager'
import { PlayerFactory } from '../src/Entities/PlayerFactory'

let componentManager = new ComponentManager()
let entityManager = new EntityManager()
let playerFactory = new PlayerFactory(entityManager, componentManager)
let recyclableComponent = new RecyclableComponent()
let playerComponent = new PlayerComponent()

beforeEach(() => {
  componentManager = new ComponentManager()
  recyclableComponent = new RecyclableComponent()
  playerComponent = new PlayerComponent()
  componentManager.components.set('recyclableComponent', recyclableComponent)
  componentManager.components.set('transformComponent', new TransformComponent())
  componentManager.components.set('translationComponent', new TranslationComponent())
  componentManager.components.set('collisionComponent', new CollisionComponent())
  componentManager.components.set('playerComponent', playerComponent)
  componentManager.components.set('renderComponent', new RenderComponent())
  componentManager.components.set('commandComponent', new CommandComponent())
  entityManager = new EntityManager()
  playerFactory = new PlayerFactory(entityManager, componentManager)
})

test('Should increment the number of entities, and subscribe the entity to components', () => {
  expect(entityManager.Entities).toBe(0)
  playerFactory.create({ x: 0, y: 0, z: 0 }, 32, 'socketId', 0, 'playerName')
  expect(entityManager.Entities).toBe(1)
})

test('Should use a recyclable entity, instead of increasing the number of entities', () => {
  expect(entityManager.Entities).toBe(0)
  playerFactory.create({ x: 0, y: 0, z: 0 }, 32, 'socketId', 0, 'playerName')
  playerFactory.create({ x: 0, y: 0, z: 0 }, 32, 'socketId', 1, 'playerName')
  expect(entityManager.Entities).toBe(2)
  componentManager.subscribeEntity(1, [new Date().getTime()], recyclableComponent)
  playerFactory.create({ x: 0, y: 0, z: 0 }, 32, 'socketId', 2, 'playerName')
  expect(entityManager.Entities).toBe(2)
  expect(playerComponent.sparseArray[1]?.accountId).toBe(2)
})
