import { IComponent } from './IComponent'

export class RenderComponent implements IComponent {
  name: 'RenderComponent'
  sparseArray: Array<{ mesh: string, texture: string, color: string}> = []
  denseArray: number[] = []
}
