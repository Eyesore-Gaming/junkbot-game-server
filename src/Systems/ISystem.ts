import { ComponentManager } from '../Components/ComponentManager'

export interface ISystem {
  name: string
  componentManager: ComponentManager
  update: (...args: any) => void
}
