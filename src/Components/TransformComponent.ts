import { IComponent } from './IComponent'
import { Quat } from '../Datatypes/IQuat'
import { Vec3 } from '../Datatypes/IVec3'
export class TransformComponent implements IComponent {
  name: 'TransformComponent'
  sparseArray: Array<{position: Vec3, rotation: Quat, scale: Vec3}> = []
  denseArray: number[] = []
}
