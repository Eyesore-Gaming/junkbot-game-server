import { Server } from 'socket.io'
import { ComponentManager } from 'src/Components/ComponentManager'
import { SocketEventListener } from './SocketEventListener'
import { EventEmitter } from 'events'

export class EventManager {
  socketListener: SocketEventListener
  componentManager: ComponentManager
  eventEmitter: EventEmitter

  init (io: Server, componentManager: ComponentManager, eventEmitter: EventEmitter): void {
    this.socketListener = new SocketEventListener(io)
    this.componentManager = componentManager
    this.eventEmitter = eventEmitter
    this.listen()
  }

  listen (): void {
    this.socketListener.listen()
    this.eventEmitter.on('initializedPlayerEntity', (entityId, socketId) => {
      this.socketListener.io.to(socketId).emit('acquiredId', entityId)
    })
  }
}
