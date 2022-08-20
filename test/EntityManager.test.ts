import { EntityManager } from '../src/Entities/EntityManager'

const entityManager = new EntityManager()

test('The entity manager has zero entities', () => {
  expect(entityManager.Entities).toBe(0)
})

test('The entity manager should have one entity', () => {
  entityManager.addEntity()
  expect(entityManager.entities).toBe(1)
})
