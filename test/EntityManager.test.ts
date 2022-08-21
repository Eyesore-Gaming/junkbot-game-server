import { EntityManager } from '../src/Entities/EntityManager'

const entityManager = new EntityManager()

test('The entity manager has zero entities', () => {
  expect(entityManager.entities).toBe(-1)
})

test('The entity manager Getter should return 0 entities', () => {
  expect(entityManager.Entities).toBe(0)
})

test('getEntities() should return 0 entities', () => {
  expect(entityManager.getEntities()).toBe(0)
})

test('The entity manager should have one entity', () => {
  const id = entityManager.addEntity()
  expect(id).toBe(0)
  expect(entityManager.Entities).toBe(1)
})
