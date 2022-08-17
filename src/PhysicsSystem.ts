import { ISystem } from './ISystem'
import { ComponentManager } from './ComponentManager'
export class PhysicsSystem implements ISystem {
  name: string
  previousUpdate: number = 0
  constructor (name: string) {
    this.name = name
  }

  update (componentManager: ComponentManager, time: number): void {
    this.previousUpdate = time
    const transformComponent = componentManager.components.get('transformComponent')
    const translationComponent = componentManager.components.get('translationComponent')
    const collisionComponent = componentManager.components.get('collisionComponent')
    if (transformComponent !== undefined && translationComponent !== undefined && collisionComponent !== undefined) {
      const entityList = componentManager.query(transformComponent, translationComponent, collisionComponent)
      for (const entity of entityList) {
        console.log(entity)
      }
    }
  }

  getLength (a: {x: number, y: number, z: number}): number {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
  }

  getDistance (a: {x: number, y: number, z: number}, b: {x: number, y: number, z: number}): number {
    const dx = (b.x - a.x) ** 2
    const dy = (b.y - a.y) ** 2
    const dz = (b.z - a.z) ** 2
    return Math.sqrt(dx + dy + dz)
  }

  getNormalize (a: {x: number, y: number, z: number}): {x: number, y: number, z: number} {
    const length = this.getLength(a)
    return { x: a.x / length, y: a.y / length, z: a.z / length }
  }

  getDot (a: {x: number, y: number, z: number}, b: {x: number, y: number, z: number}): number {
    return a.x * b.x + a.y * b.y + a.z * b.z
  }

  getCross (a: {x: number, y: number, z: number}, b: {x: number, y: number, z: number}): {x: number, y: number, z: number} {
    const cx = a.y * b.z - a.z * b.y
    const cy = a.z * b.x - a.x * b.z
    const cz = a.x * b.y - a.y * b.x
    return { x: cx, y: cy, z: cz }
  }
}
