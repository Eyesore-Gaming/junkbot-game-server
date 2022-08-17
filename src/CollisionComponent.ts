import { IComponent } from './IComponent'
import { Vec3 } from './Vec3'
export class CollisionComponent implements IComponent {
  name: 'collisionComponent'
  sparseArray: Array<{mesh: Vec3, type: string}> = []
  denseArray: number[] = []
}
