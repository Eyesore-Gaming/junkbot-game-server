import { Vec3 } from 'src/Datatypes/IVec3'
import { IComponent } from './IComponent'

export class CommandComponent implements IComponent {
  name: string = 'CommandComponent'
  sparseArray: Array<{command: string, targetPos: Vec3, targetId: number}> = []
  denseArray: number[] = []
}
