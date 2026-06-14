"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UITestPlanner = void 0;
const GeminiProvider_1 = require("./GeminiProvider");
class UITestPlanner {
    gemini = new GeminiProvider_1.GeminiProvider();
    async plan(story, dom) {
        const prompt = `

Você é um QA Senior.

História:

${story}

------------------------------------

DOM DA TELA:

${JSON.stringify(dom, null, 2)}

------------------------------------

Baseado nisso gere JSON:

{

"functionalTests":[],

"negativeTests":[],

"securityTests":[],

"playwrightFlows":[]

}

`;
        return await this.gemini.analyze(prompt);
    }
}
exports.UITestPlanner = UITestPlanner;
//# sourceMappingURL=UITestPlanner.js.map