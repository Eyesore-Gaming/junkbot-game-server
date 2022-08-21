import { ComponentManager } from 'src/Components/ComponentManager'
import { ISystem } from './ISystem'
import { Logger } from 'src/Logger'

const FILE_NAME = 'GameSystem.ts'

export class GameSystem implements ISystem {
  name: string
  componentManager: ComponentManager
  io: any
  logger: Logger
  constructor (name: string, io: any, logger: Logger) {
    this.name = name
    this.io = io
    this.logger = logger
  }

  init (): void {
    this.logger.info(FILE_NAME, 'init()', 'GameSystem initializing...')
  }

  update (time: number): void {
    this.logger.info(FILE_NAME, 'update()', `Placeholder so typescript will compile...${time}`)
  }
}
