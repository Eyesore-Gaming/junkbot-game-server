import { IComponent } from './IComponent'
import { Vec3 } from './Vec3'

export class TranslationComponent implements IComponent {
  name: 'translationComponent'
  sparseArray: Vec3[] = []
  denseArray: number[] = []
}
