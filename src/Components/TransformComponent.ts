import { IComponent } from './IComponent'
import { Quat } from '../IQuat'
import { Vec3 } from '../IVec3'
export class TransformComponent implements IComponent {
  name: 'transformComponent'
  sparseArray: Array<{position: Vec3, rotation: Quat, scale: Vec3}> = []
  denseArray: number[] = []
}
