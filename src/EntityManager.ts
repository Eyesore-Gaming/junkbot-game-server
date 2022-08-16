export class EntityManager {
  entities: number
  constructor () {
    this.entities = 0
  }

  get Entities (): number {
    return this.entities
  }

  addEntity (): void {
    this.entities++
    // TODO add an event listener to singal an Entity Added event
  }
}
