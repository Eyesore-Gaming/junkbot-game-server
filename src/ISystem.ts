import { ComponentManager } from './ComponentManager'

export interface ISystem {
  name: string
  update: (compnentManager: ComponentManager, ...args: any) => void
}
