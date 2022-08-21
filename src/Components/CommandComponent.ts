import { Vec3 } from 'src/IVec3'
import { IComponent } from './IComponent'

export class CommandComponent implements IComponent {
  name: string = 'commandComponent'
  sparseArray: Array<{command: string, target: Vec3}> = []
  denseArray: number[] = []
}
