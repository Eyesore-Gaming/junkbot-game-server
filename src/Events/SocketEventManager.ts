import { Server } from 'socket.io'
import { Logger } from '../Logger'

const FILE_NAME = 'SocketEventListener.ts'

export class SocketEventManager {
  io: Server
  logger: Logger
  constructor (io: Server) {
    this.io = io
    this.logger = Logger.getInstance()
  }

  initListener (): void {
    this.io.on('connection', (socket) => {
      socket.on('hello', () => {
        this.logger.info(FILE_NAME, 'initListener()', `Received a hello from ${socket.id}`)
      })

      this.logger.info(FILE_NAME, 'initListener()', `Received a new connection from client: id ${socket.id}`)
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
