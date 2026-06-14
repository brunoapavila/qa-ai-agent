"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateScenarioAgent = void 0;
const ScenarioAgent_1 = require("./ScenarioAgent");
class GenerateScenarioAgent {
    async execute(context) {
        if (!context.story) {
            throw new Error("Story não encontrada.");
        }
        const generator = new ScenarioAgent_1.ScenarioAgent();
        context.scenarios = generator.generate(context.story);
        console.log(`✅ ${context.scenarios.length} cenários gerados`);
    }
}
exports.GenerateScenarioAgent = GenerateScenarioAgent;
//# sourceMappingURL=GenerateScenarioAgent.js.map