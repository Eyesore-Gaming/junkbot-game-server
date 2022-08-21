import { IComponent } from './IComponent'
// This is a 'tag' component to mark an entity that can be reused
export class RecyclableComponent implements IComponent {
  name: 'RecyclableComponent'
  sparseArray: number[] = [] // Keep track of when an entity was tagged as Recyclable, might be useful
  denseArray: number[] = []
}
