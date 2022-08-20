import { IComponent } from './IComponent'

export class PlayerComponent implements IComponent {
  name: 'playerComponent'
  sparseArray: Array<{ socketId: string, accountId: number, playerName: string}> = []
  denseArray: number[] = []
}
