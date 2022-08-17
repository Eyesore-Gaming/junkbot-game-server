export class SimpleTestClass {
    constructor(name, health, mana) {
        this.name = name;
        this.health = health;
        this.mana = mana;
    }
    get Name() {
        return this.name;
    }
    set Name(newName) {
        if (newName.trim() === '') {
            throw new Error('Name cannot be empty');
        }
        this.name = newName;
    }
    get Health() {
        return this.health;
    }
    set Health(newHealth) {
        if (newHealth < 0) {
            throw new Error('Health cannot be below zero');
        }
        this.health = newHealth;
    }
    get Mana() {
        return this.mana;
    }
    set Mana(newMana) {
        if (newMana < 0) {
            throw new Error('Mana cannot be below zero');
        }
        this.mana = newMana;
    }
}
export default SimpleTestClass;
//# sourceMappingURL=SimpleTestClass.js.map