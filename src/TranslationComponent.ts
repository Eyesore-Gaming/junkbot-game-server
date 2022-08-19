import { IComponent } from './IComponent'

export class TranslationComponent implements IComponent {
  name: 'translationComponent'
  sparseArray: Array<{speed: number, velocity: {x: number, y: number, z: number}, target: {x: number, y: number, z: number }}> = []
  denseArray: number[] = []
}
