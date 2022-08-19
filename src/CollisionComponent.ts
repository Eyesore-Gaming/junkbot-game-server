import { IComponent } from './IComponent'
export class CollisionComponent implements IComponent {
  name: 'collisionComponent'
  sparseArray: Array<{mesh: {length: number, width: number, height: number}, solid: boolean, static: boolean}> | Array<{mesh: {radius: number}, solid: boolean, static: boolean}>= []
  denseArray: number[] = []
}
