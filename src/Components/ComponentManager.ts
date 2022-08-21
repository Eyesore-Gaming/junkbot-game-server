import { IComponent } from './IComponent'

export class ComponentManager {
  components: Map<string, IComponent> = new Map<string, IComponent>()

  subscribeEntity (id: number, params: any[], ...components: IComponent[] | undefined[]): void {
    let paramIndex = 0
    for (const component of components) {
      if (component !== undefined) {
        component.sparseArray[id] = params[paramIndex]
        const index = component.denseArray.indexOf(id)
        if (index === -1) {
          component.denseArray.push(id)
        }
        paramIndex++
      }
    }
  }

  unsubscribeEntity (id: number, ...components: IComponent[]): void {
    for (const component of components) {
      if (component !== undefined) {
        const index = component.denseArray.indexOf(id)
        // if there is only one entity remaining in the array, clear it as splice won't work
        if (index > -1 && component.denseArray.length === 1) {
          component.denseArray = []
        } else if (index > -1) { // only splice if the item is found
          component.denseArray.splice(index, 1)
        }
      }
    }
  }

  // Query to get the entity ids of entities that have all of the listed componenets
  query (...components: IComponent[]): number[] {
    let shortestComponent: IComponent = { name: '', sparseArray: [], denseArray: [] }
    let shortestLength: number = Number.MAX_SAFE_INTEGER
    // Get the componenet that has the fewest entities subscribed
    for (const c of components) {
      if (c.denseArray.length < shortestLength) {
        shortestComponent = c
        shortestLength = c.denseArray.length
      }
    }
    // After the component with the fewest subscribers is found, iterate through the other components and remove the entities that don't have the other componenets
    let queryList: number[] = Object.assign([], shortestComponent.denseArray)
    for (const c of components) {
      if (c !== shortestComponent) {
        queryList = queryList.filter(Set.prototype.has, new Set(c.denseArray))
      }
    }
    return queryList
  }
}