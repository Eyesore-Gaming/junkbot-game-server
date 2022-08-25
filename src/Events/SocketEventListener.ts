import { Server } from 'socket.io'
import { Logger } from '../Logger'
import { IEvent } from './IEvent'
import { IEventListener } from './IEventListener'

const FILE_NAME = 'SocketEventListener.ts'

export class SocketEventListener implements IEventListener {
  name: string = 'socketListener'
  io: Server
  logger: Logger
  eventQueue: IEvent[] = []
  constructor (io: Server) {
    this.io = io
    this.logger = Logger.getInstance()
  }

  listen (): void {
    this.logger.info(FILE_NAME, 'listen()', 'SocketEventListener is listening...')
    this.io.on('connection', (socket) => {
      // socket.on('moveRequest', (data) => {
      //   // TODO implement move request
      // })

      socket.on('ping', (time: number) => {
        socket.emit('pong', time)
      })

      this.logger.info(FILE_NAME, 'listen()', `Received a new connection from client: id ${socket.id}`)
      this.eventQueue.push({ event: 'newPlayer', data: { socketId: socket.id } })
    })
  }
}

export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

export interface ClientToServerEvents {
  hello: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
