import { ComponentManager } from '../Components/ComponentManager'
import { EntityManager } from './EntityManager'
import { IEntityFactory } from './IEntityFactory'
import { Vec3 } from 'src/Datatypes/IVec3'

export class PlayerFactory implements IEntityFactory {
  entityManager: EntityManager
  componentManager: ComponentManager
  constructor (entityManager: EntityManager, componentManager: ComponentManager) {
    this.entityManager = entityManager
    this.componentManager = componentManager
  }

  create (position: Vec3, speed: number, socketId: string, accountId: number, playerName: string): number {
    const transform = { position, rotation: { a: 0, b: 0, c: 0, d: 0 }, scale: { x: 32, y: 32, z: 0 } }
    const translation = { speed, velocity: { x: 0, y: 0, z: 0 }, destination: position }
    const collision = { mesh: { radius: 32 }, solid: true, static: false }
    const player = { socketId, accountId, playerName }
    const render = { mesh: 'circle', texture: 'none', color: '#00FF00' }
    const command = { command: 'none', targetPos: position, targetId: -1 }
    if (this.componentManager.recyclableComponent.denseArray.length > 0 && this.componentManager.recyclableComponent.denseArray[0] !== undefined) {
      const id = this.componentManager.recyclableComponent.denseArray[0]
      this.componentManager.unsubscribeAll(id)
      this.componentManager.subscribeEntity(id, [transform, translation, collision, player, render, command],
        this.componentManager.transformComponent, this.componentManager.translationComponent, this.componentManager.collisionComponent, this.componentManager.playerComponent, this.componentManager.renderComponent, this.componentManager.commandComponent)
      return id
    } else {
      const id = this.entityManager.addEntity()
      this.componentManager.subscribeEntity(id, [transform, translation, collision, player, render, command],
        this.componentManager.transformComponent, this.componentManager.translationComponent, this.componentManager.collisionComponent, this.componentManager.playerComponent, this.componentManager.renderComponent, this.componentManager.commandComponent)
      return id
    }
  }
}
