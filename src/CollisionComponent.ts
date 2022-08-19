import { IComponent } from './IComponent'
export class CollisionComponent implements IComponent {
  name: 'collisionComponent'
  sparseArray: Array<{mesh: {length: number, width: number, height: number}, type: string}> | Array<{mesh: {radius: number}, type: string}>= []
  denseArray: number[] = []
}
