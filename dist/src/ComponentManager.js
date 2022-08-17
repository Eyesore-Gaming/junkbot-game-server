export class ComponentManager {
    constructor() {
        this.components = new Map();
    }
    subscribeEntity(id, params, ...components) {
        let paramIndex = 0;
        for (const component of components) {
            component.sparseArray[id] = params[paramIndex];
            const index = component.denseArray.indexOf(id);
            if (index === -1) {
                component.denseArray.push(id);
            }
            paramIndex++;
        }
    }
    unsubscribeEntity(id, ...components) {
        for (const component of components) {
            const index = component.denseArray.indexOf(id);
            if (index > -1 && component.denseArray.length === 1) {
                component.denseArray = [];
            }
            else if (index > -1) {
                component.denseArray.splice(index, 1);
            }
        }
    }
    query(...components) {
        let shortestComponent = { name: '', sparseArray: [], denseArray: [] };
        let shortestLength = Number.MAX_SAFE_INTEGER;
        for (const c of components) {
            if (c.denseArray.length < shortestLength) {
                shortestComponent = c;
                shortestLength = c.denseArray.length;
            }
        }
        let queryList = Object.assign([], shortestComponent.denseArray);
        for (const c of components) {
            if (c !== shortestComponent) {
                queryList = queryList.filter(Set.prototype.has, new Set(c.denseArray));
            }
        }
        return queryList;
    }
}
//# sourceMappingURL=ComponentManager.js.map