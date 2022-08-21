export class EntityManager {
  entities: number
  constructor () {
    this.entities = -1
  }

  get Entities (): number {
    return this.entities + 1
  }

  getEntities (): number {
    return this.entities + 1
  }

  addEntity (): number {
    return ++this.entities
    // TODO add an event listener to singal an Entity Added event
  }
}
