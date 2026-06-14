"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementAgent = void 0;
const crypto_1 = require("crypto");
class RequirementAgent {
    analyze(text) {
        const lines = text
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);
        return {
            id: (0, crypto_1.randomUUID)(),
            title: "História de Usuário",
            actor: lines.find(line => line.startsWith("Como")) || "",
            goal: lines.find(line => line.startsWith("Quero")) || "",
            benefit: lines.find(line => line.startsWith("Para")) || "",
            acceptanceCriteria: lines.filter(line => line.startsWith("-")),
            businessRules: []
        };
    }
}
exports.RequirementAgent = RequirementAgent;
//# sourceMappingURL=RequirementAgent.js.map