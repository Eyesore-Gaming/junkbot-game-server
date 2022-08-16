import { IComponent } from './IComponent'
import { Vec3 } from './Vec3'
import { Quat } from './Quat'
export class TransformComponent implements IComponent {
  name: 'transformComponent'
  sparseArray: Array<{position: Vec3, rotation: Quat, scale: Vec3}> = []
  denseArray: number[] = []
}
