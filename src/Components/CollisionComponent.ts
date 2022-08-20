import { IComponent } from './IComponent'
import { Vec3 } from '../IVec3'
export class CollisionComponent implements IComponent {
  name: 'collisionComponent'
  sparseArray: Array<{mesh: Vec3, solid: boolean, static: boolean}> | Array<{mesh: {radius: number}, solid: boolean, static: boolean}>= []
  denseArray: number[] = []
}
