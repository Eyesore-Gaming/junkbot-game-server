import { IComponent } from './IComponent'
import { Quat } from './Quat'
import { Vec3 } from './Vec3'
export class TransformComponent implements IComponent {
  name: 'transformComponent'
  sparseArray: Array<{position: Vec3, rotation: Quat, scale: Vec3}> = []
  denseArray: number[] = []
}
