import { ComponentManager } from '../Components/ComponentManager'
import { EntityManager } from './EntityManager'
import { IComponent } from '../Components/IComponent'

export interface IEntityFactory {
  entityManager: EntityManager
  componentManager: ComponentManager
  create: (data: any[], ...components: IComponent[]) => {}
}
