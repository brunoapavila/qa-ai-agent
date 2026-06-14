"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAnalysisAgent = void 0;
const MockProvider_1 = require("../ai/MockProvider");
class AIAnalysisAgent {
    async execute(context) {
        const provider = new MockProvider_1.MockProvider();
        const analysis = await provider.analyze(context.storyText);
        context.analysis = analysis;
        console.log("");
        console.log("=================================");
        console.log("🧠 AI ANALYSIS");
        console.log("=================================");
        console.table(analysis.businessRules);
        console.table(analysis.risks);
        console.table(analysis.positiveTests);
        console.table(analysis.negativeTests);
        console.table(analysis.boundaryTests);
        console.table(analysis.securityTests);
        console.log("");
        console.log(`✅ ${analysis.businessRules.length} regras encontradas`);
        console.log(`✅ ${analysis.risks.length} riscos encontrados`);
    }
}
exports.AIAnalysisAgent = AIAnalysisAgent;
//# sourceMappingURL=AIAnalysisAgent.js.map