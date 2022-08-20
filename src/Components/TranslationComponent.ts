import { IComponent } from './IComponent'
import { Vec3 } from '../IVec3'

export class TranslationComponent implements IComponent {
  name: 'translationComponent'
  sparseArray: Array<{speed: number, velocity: Vec3, target: Vec3}> = []
  denseArray: number[] = []
}
