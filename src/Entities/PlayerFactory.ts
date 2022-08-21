import { ComponentManager } from '../Components/ComponentManager'
import { EntityManager } from './EntityManager'
import { IEntityFactory } from './IEntityFactory'
import { Vec3 } from 'src/IVec3'

export class PlayerFactory implements IEntityFactory {
  entityManager: EntityManager
  componentManager: ComponentManager
  constructor (entityManager: EntityManager, componentManager: ComponentManager) {
    this.entityManager = entityManager
    this.componentManager = componentManager
  }

  create (position: Vec3, speed: number, socketId: string, accountId: number, playerName: string): void {
    const transform = { position, rotation: { a: 0, b: 0, c: 0, d: 0 }, scale: { x: 32, y: 32, z: 0 } }
    const translation = { speed, velocity: { x: 0, y: 0, z: 0 }, target: position }
    const collision = { mesh: { radius: 32 }, solid: true, static: false }
    const player = { socketId, accountId, playerName }
    const render = { mesh: 'circle', texture: 'none', color: '#00FF00' }
    const command = { command: 'none', target: position }
    const recyclableComponent = this.componentManager.components.get('recyclableComponent')
    const transformComponent = this.componentManager.components.get('transformComponent')
    const translationComponent = this.componentManager.components.get('translationComponent')
    const collisionComponent = this.componentManager.components.get('collisionComponent')
    const playerComponent = this.componentManager.components.get('playerComponent')
    const renderComponent = this.componentManager.components.get('renderComponent')
    const commandComponent = this.componentManager.components.get('commandComponent')
    if (recyclableComponent !== undefined && transformComponent !== undefined && translationComponent !== undefined && collisionComponent !== undefined && playerComponent !== undefined &&
       renderComponent !== undefined && commandComponent !== undefined) {
      // TODO refactor recycling outside of PlayerFactory, as other Factories are going to be using this logic
      if (recyclableComponent.denseArray.length > 0) {
        const id = recyclableComponent.denseArray.pop()
        this.componentManager.components.forEach((value) => {
          this.componentManager.unsubscribeEntity(id, value)
        })
        this.componentManager.subscribeEntity(id, [transform, translation, collision, player, render, command],
          transformComponent, translationComponent, collisionComponent, playerComponent, renderComponent, commandComponent)
      } else {
        const id = this.entityManager.addEntity()
        this.componentManager.subscribeEntity(id, [transform, translation, collision, player, render, command],
          transformComponent, translationComponent, collisionComponent, playerComponent, renderComponent, commandComponent)
      }
    }
  }
}
