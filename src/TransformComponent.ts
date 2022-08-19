import { IComponent } from './IComponent'
export class TransformComponent implements IComponent {
  name: 'transformComponent'
  sparseArray: Array<{position: {x: number, y: number, z: number}, rotation: {a: number, b: number, c: number, d: number}, scale: {l: number, w: number, h: number}}> = []
  denseArray: number[] = []
}
