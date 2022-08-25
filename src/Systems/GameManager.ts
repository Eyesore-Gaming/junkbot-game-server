import { ComponentManager } from '../Components/ComponentManager'
import { ISystem } from './ISystem'
import { Logger } from '../Logger'
import { Server } from 'socket.io'
import { PhysicsSystem } from './PhysicsSystem'
import { EventManager } from '../Events/EventManager'
import { PlayerFactory } from '../Entities/PlayerFactory'
import { EntityManager } from '../Entities/EntityManager'
import { EventEmitter } from 'events'
const FILE_NAME = 'GameManager.ts'

export class GameManager implements ISystem {
  name: string
  componentManager: ComponentManager
  entityManager: EntityManager
  io: Server
  logger: Logger
  eventManager: EventManager
  physicSystem: PhysicsSystem
  tickRate: number = 200 // Tick rate is set to 200ms
  playerFactory: PlayerFactory
  eventEmitter: EventEmitter

  constructor (name: string, io: Server) {
    this.name = name
    this.io = io
    this.logger = Logger.getInstance()
  }

  init (): void {
    this.logger.info(FILE_NAME, 'init()', 'GameSystem initializing...')
    // Initialize Managers
    this.entityManager = new EntityManager()
    this.componentManager = new ComponentManager()
    this.eventEmitter = new EventEmitter()
    this.eventManager = new EventManager()
    this.eventManager.init(this.io, this.componentManager, this.eventEmitter)

    // Initialize Systems
    this.physicSystem = new PhysicsSystem('physicSystem', this.componentManager)

    // Initialize Factories
    this.playerFactory = new PlayerFactory(this.entityManager, this.componentManager)

    this.gameLoop() // initialize with -1 so delta time doesn't cause a divide by zero error
  }

  gameLoop (): void {
    let time = this.update(new Date().getTime() - 1)
    setInterval(() => {
      time = this.update(time)
    }, 1000 / 60)
  }

  update (lastTime: number): number {
    const time = new Date().getTime()
    const deltaTime = time - lastTime
    while (this.eventManager.socketListener.eventQueue.length > 0) {
      const event = this.eventManager.socketListener.eventQueue.pop()
      switch (event?.event) {
        case 'newPlayer': {
          const entityId = this.playerFactory.create({ x: 0, y: 0, z: 0 }, 200, event.data.socketId, 0, 'testName')
          this.eventEmitter.emit('initializedPlayerEntity', entityId, event.data.socketId)
        }
      }
    }
    this.physicSystem.update(deltaTime / 1000) // the divide by 1000 keeps units in seconds. Remove to keep time unit in miliseconds
    return time
  }
}
