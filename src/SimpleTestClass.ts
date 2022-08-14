export class SimpleTestClass {
  name: string
  health: number
  mana: number

  constructor (name: string, health: number, mana: number) {
    this.name = name
    this.health = health
    this.mana = mana
  }

  get Name (): string {
    return this.name
  }

  set Name (newName: string) {
    if (newName.trim() === '') {
      throw new Error('Name cannot be empty')
    }
    this.name = newName
  }

  get Health (): number {
    return this.health
  }

  set Health (newHealth: number) {
    if (newHealth < 0) {
      throw new Error('Health cannot be below zero')
    }
    this.health = newHealth
  }

  get Mana (): number {
    return this.mana
  }

  set Mana (newMana: number) {
    if (newMana < 0) {
      throw new Error('Mana cannot be below zero')
    }
    this.mana = newMana
  }
}
