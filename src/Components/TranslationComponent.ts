import { IComponent } from './IComponent'
import { Vec3 } from '../Datatypes/IVec3'

export class TranslationComponent implements IComponent {
  name: 'TranslationComponent'
  sparseArray: Array<{speed: number, velocity: Vec3, destination: Vec3}> = []
  denseArray: number[] = []
}
