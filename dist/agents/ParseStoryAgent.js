"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseStoryAgent = void 0;
const RequirementAgent_1 = require("./RequirementAgent");
class ParseStoryAgent {
    async execute(context) {
        const parser = new RequirementAgent_1.RequirementAgent();
        context.story = parser.analyze(context.storyText);
        console.log("✅ História interpretada");
    }
}
exports.ParseStoryAgent = ParseStoryAgent;
//# sourceMappingURL=ParseStoryAgent.js.map