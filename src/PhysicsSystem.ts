import { ISystem } from './ISystem'
import { ComponentManager } from './ComponentManager'
import { Vec3 } from './Vec3'

export class PhysicsSystem implements ISystem {
  name: string
  LOW_LIMIT: number = 0.0167
  HIGH_LIMIT: number = 0.1
  lastTime: number = new Date().getTime()
  constructor (name: string) {
    this.name = name
  }

  update (componentManager: ComponentManager, time: number): void {
    let deltaTime = (time - this.lastTime) / 1000 // the divide by 1000 keeps units in seconds. Remove to keep time unit in miliseconds
    if (deltaTime < this.LOW_LIMIT) { deltaTime = this.LOW_LIMIT } else if (deltaTime > this.HIGH_LIMIT) { deltaTime = this.HIGH_LIMIT }
    const transformComponent = componentManager.components.get('transformComponent')
    const translationComponent = componentManager.components.get('translationComponent')
    const collisionComponent = componentManager.components.get('collisionComponent')
    if (transformComponent !== undefined && translationComponent !== undefined && collisionComponent !== undefined) {
      const entityList = componentManager.query(transformComponent, translationComponent)
      for (const entity of entityList) {
        translationComponent.sparseArray[entity].velocity = this.calculateMove(transformComponent.sparseArray[entity].position, translationComponent.sparseArray[entity].destination, translationComponent.sparseArray[entity].speed, deltaTime)
        transformComponent.sparseArray[entity].position = this.addPosition(transformComponent.sparseArray[entity].position, translationComponent.sparseArray[entity].velocity)
      }
      const collisionList: number[] = componentManager.query(translationComponent, collisionComponent)

      for (const a of collisionList) {
        if (collisionComponent.sparseArray[a].solid === false) { continue }
        const bodyA = { position: transformComponent.sparseArray[a].position, radius: collisionComponent.sparseArray[a].mesh.radius }
        for (const b of collisionList) {
          if (collisionComponent.sparseArray[b].solid === false) { continue }
          const bodyB = { position: transformComponent.sparseArray[b].position, radius: collisionComponent.sparseArray[b].mesh.radius }
          const intersect = this.getCirclesIntersect({ center: bodyA.position, radius: bodyA.radius }, { center: bodyB.position, radius: bodyB.radius })
          if (intersect.collision) {
            // if the b entity is static, only entity a shifts away
            if (collisionComponent.sparseArray[b].static === true) {
              transformComponent.sparseArray[a].position = this.addPosition(transformComponent.sparseArray[a].position, { x: -intersect.normal.x * intersect.depth, y: -intersect.normal.y * intersect.depth, z: -intersect.normal.z * intersect.depth })
            } else if (collisionComponent.sparseArray[a].static === true) { // if the a entity is static, only entity b shifts away
              transformComponent.sparseArray[b].position = this.addPosition(transformComponent.sparseArray[b].position, { x: intersect.normal.x * intersect.depth, y: intersect.normal.y * intersect.depth, z: intersect.normal.z * intersect.depth })
            } else { // else both entities shift away from each other
              transformComponent.sparseArray[a].position = this.addPosition(transformComponent.sparseArray[a].position, { x: -intersect.normal.x * intersect.depth / 2, y: -intersect.normal.y * intersect.depth / 2, z: -intersect.normal.z * intersect.depth / 2 })
              transformComponent.sparseArray[b].position = this.addPosition(transformComponent.sparseArray[b].position, { x: intersect.normal.x * intersect.depth / 2, y: intersect.normal.y * intersect.depth / 2, z: intersect.normal.z * intersect.depth / 2 })
            }
          }
        }
      }
    }
  }

  getLength (a: Vec3): number {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
  }

  getDistance (a: Vec3, b: Vec3): number {
    const dx = (b.x - a.x) ** 2
    const dy = (b.y - a.y) ** 2
    const dz = (b.z - a.z) ** 2
    return Math.sqrt(dx + dy + dz)
  }

  getNormalize (a: Vec3): Vec3 {
    const length = this.getLength(a)
    if (length === 0) { return { x: 0, y: 0, z: 0 } }
    const cx = (a.x === 0) ? 0 : (a.x / length)
    const cy = (a.y === 0) ? 0 : (a.y / length)
    const cz = (a.z === 0) ? 0 : (a.z / length)
    return { x: cx, y: cy, z: cz }
  }

  getDot (a: Vec3, b: Vec3): number {
    return a.x * b.x + a.y * b.y + a.z * b.z
  }

  getCross (a: Vec3, b: Vec3): Vec3 {
    const cx = a.y * b.z - a.z * b.y
    const cy = a.z * b.x - a.x * b.z
    const cz = a.x * b.y - a.y * b.x
    return { x: cx, y: cy, z: cz }
  }

  getCirclesIntersect (a: {center: Vec3, radius: number}, b: {center: Vec3, radius: number}): {collision: boolean, normal: Vec3, depth: number} {
    const distance = this.getDistance(a.center, b.center)
    const radii = a.radius + b.radius
    if (distance >= radii) {
      return { collision: false, normal: { x: 0, y: 0, z: 0 }, depth: 0 }
    }

    const c = { x: b.center.x - a.center.x, y: b.center.y - a.center.y, z: b.center.z - a.center.z }
    const normal = this.getNormalize(c)
    const depth = radii - distance

    return { collision: true, normal, depth }
  }

  calculateMove (position: Vec3, destination: Vec3, speed: number, deltaTime: number): Vec3 {
    const c = { x: destination.x - position.x, y: destination.y - position.y, z: destination.z - position.z }
    const normal = this.getNormalize(c)
    return { x: normal.x * speed * deltaTime, y: normal.y * speed * deltaTime, z: normal.z * speed * deltaTime }
  }

  addPosition (a: Vec3, b: Vec3): Vec3 {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
  }
}
