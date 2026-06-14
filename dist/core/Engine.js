"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
class Engine {
    steps = [];
    add(step) {
        this.steps.push(step);
    }
    async run(context) {
        for (const step of this.steps) {
            await step.execute(context);
        }
    }
}
exports.Engine = Engine;
//# sourceMappingURL=Engine.js.map