import { ComponentManager } from '../Components/ComponentManager'
import { ISystem } from './ISystem'
import { Logger } from '../Logger'
import { Server } from 'socket.io'
import { SocketEventManager } from '../Events/SocketEventManager'

const FILE_NAME = 'GameSystem.ts'

export class GameSystem implements ISystem {
  name: string
  componentManager: ComponentManager
  io: Server
  logger: Logger
  socketManager: SocketEventManager
  constructor (name: string, io: Server) {
    this.name = name
    this.io = io
    this.logger = Logger.getInstance()
  }

  init (): void {
    this.logger.info(FILE_NAME, 'init()', 'GameSystem initializing...')
    this.componentManager = new ComponentManager()
    this.socketManager = new SocketEventManager(this.io)
    this.socketManager.initListener()
  }

  update (time: number): void {
    this.logger.info(FILE_NAME, 'update()', `Placeholder so typescript will compile...${time}`)
  }
}
