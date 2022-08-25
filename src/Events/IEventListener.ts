export interface IEventListener {
  eventQueue: any[]
  listen: (...args: any) => void
}
