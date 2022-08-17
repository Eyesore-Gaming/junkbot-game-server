export class PhysicsSystem {
    constructor(name) {
        this.previousUpdate = 0;
        this.name = name;
    }
    update(componentManager, time) {
        this.previousUpdate = time;
        const transformComponent = componentManager.components.get('transformComponent');
        const translationComponent = componentManager.components.get('translationComponent');
        const collisionComponent = componentManager.components.get('collisionComponent');
        if (transformComponent !== undefined && translationComponent !== undefined && collisionComponent !== undefined) {
            const entityList = componentManager.query(transformComponent, translationComponent, collisionComponent);
            for (const entity of entityList) {
                console.log(entity);
            }
        }
    }
    getLength(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    }
    getDistance(a, b) {
        const dx = Math.pow((b.x - a.x), 2);
        const dy = Math.pow((b.y - a.y), 2);
        const dz = Math.pow((b.z - a.z), 2);
        return Math.sqrt(dx + dy + dz);
    }
    getNormalize(a) {
        const length = this.getLength(a);
        return { x: a.x / length, y: a.y / length, z: a.z / length };
    }
    getDot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    getCross(a, b) {
        const cx = a.y * b.z - a.z * b.y;
        const cy = a.z * b.x - a.x * b.z;
        const cz = a.x * b.y - a.y * b.x;
        return { x: cx, y: cy, z: cz };
    }
}
//# sourceMappingURL=PhysicsSystem.js.map