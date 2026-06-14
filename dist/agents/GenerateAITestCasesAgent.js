"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAITestCasesAgent = void 0;
class GenerateAITestCasesAgent {
    async execute(context) {
        if (!context.analysis) {
            throw new Error("AI Analysis não encontrada.");
        }
        let count = 1;
        console.log("");
        console.log("========== TEST CASES ==========");
        const printCases = (category, tests) => {
            tests.forEach(test => {
                console.log("");
                console.log(`CT${String(count).padStart(3, "0")}`);
                console.log(`[${category}] ${test}`);
                count++;
            });
        };
        printCases("POSITIVE", context.analysis.positiveTests);
        printCases("NEGATIVE", context.analysis.negativeTests);
        printCases("BOUNDARY", context.analysis.boundaryTests);
        printCases("SECURITY", context.analysis.securityTests);
        console.log("");
        console.log(`✅ ${count - 1} CTs gerados`);
    }
}
exports.GenerateAITestCasesAgent = GenerateAITestCasesAgent;
//# sourceMappingURL=GenerateAITestCasesAgent.js.map