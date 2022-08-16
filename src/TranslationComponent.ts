import { IComponent } from './IComponent'

export class TranslationComponent implements IComponent {
  name: 'translationComponent'
  sparseArray: Array<{speed: number, direction: number}> = []
  denseArray: number[] = []
}
