import { ComponentManager } from '../Components/ComponentManager'
import { EntityManager } from './EntityManager'
export interface IEntityFactory {
  entityManager: EntityManager
  componentManager: ComponentManager
  create: (...data: any) => number
}
