import { ISystem } from './ISystem'
import { ComponentManager } from '../Components/ComponentManager'
import { Vec3 } from '../Datatypes/IVec3'
import { IComponent } from '../Components/IComponent'

export class PhysicsSystem implements ISystem {
  name: string
  LOW_LIMIT: number = 0.0167
  HIGH_LIMIT: number = 0.1
  componentManager: ComponentManager = new ComponentManager()
  constructor (name: string, componentManager: ComponentManager) {
    this.name = name
    this.componentManager = componentManager
  }

  update (deltaTime: number): void {
    // Retrieve relevant components and abort if there are zero of any type
    if (deltaTime < this.LOW_LIMIT) { deltaTime = this.LOW_LIMIT } else if (deltaTime > this.HIGH_LIMIT) { deltaTime = this.HIGH_LIMIT }
    const entityList = this.componentManager.query(this.componentManager.transformComponent, this.componentManager.translationComponent)
    for (const entity of entityList) {
      const eTr = this.componentManager.transformComponent.sparseArray[entity]
      const eTl = this.componentManager.translationComponent.sparseArray[entity]
      if (eTr !== undefined && eTl !== undefined) {
        eTl.velocity = this.setVelocity(eTr.position, eTl.destination, eTl.speed, deltaTime)
        eTr.position = this.addPosition(eTr.position, eTl.velocity)
      }
    }

    this.handleCollisions(this.componentManager.transformComponent, this.componentManager.translationComponent, this.componentManager.collisionComponent)
  }

  handleCollisions (transformComponent: IComponent, translationComponent: IComponent, collisionComponent: IComponent): void {
    const collisionList: number[] = this.componentManager.query(translationComponent, collisionComponent)
    for (const a of collisionList) {
      if (collisionComponent.sparseArray[a].static === true) { continue } // If entity a is static, it shouldn't be moving
      const bodyA = { position: transformComponent.sparseArray[a].position, radius: collisionComponent.sparseArray[a].mesh.radius }
      for (const b of collisionList) {
        if (collisionComponent.sparseArray[b].static === false) { continue } // Only shift position if entity b collided with is static
        const bodyB = { position: transformComponent.sparseArray[b].position, radius: collisionComponent.sparseArray[b].mesh.radius }
        const intersect = this.getCirclesIntersect({ center: bodyA.position, radius: bodyA.radius }, { center: bodyB.position, radius: bodyB.radius })
        if (intersect.collision) {
          if (collisionComponent.sparseArray[b].static === true) {
            transformComponent.sparseArray[a].position = this.addPosition(transformComponent.sparseArray[a].position, { x: -intersect.normal.x * intersect.depth, y: -intersect.normal.y * intersect.depth, z: -intersect.normal.z * intersect.depth })
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

  setVelocity (position: Vec3, destination: Vec3, speed: number, deltaTime: number): Vec3 {
    const c = { x: destination.x - position.x, y: destination.y - position.y, z: destination.z - position.z }
    const normal = this.getNormalize(c)
    return { x: normal.x * speed * deltaTime, y: normal.y * speed * deltaTime, z: normal.z * speed * deltaTime }
  }

  addPosition (a: Vec3, b: Vec3): Vec3 {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
  }
}
