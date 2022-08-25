import { IComponent } from './IComponent'

export class PlayerComponent implements IComponent {
  name: 'PlayerComponent'
  sparseArray: Array<{ socketId: string, accountId: number, playerName: string, sessionStart: number}> = []
  denseArray: number[] = []
}
