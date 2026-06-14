"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlannerAgent = void 0;
class PlannerAgent {
    generate(story) {
        const plan = {
            businessRules: [],
            positiveTests: [],
            negativeTests: [],
            boundaryTests: [],
            securityTests: [],
            risks: []
        };
        story.acceptanceCriteria.forEach(criteria => {
            const rule = criteria.replace("-", "").trim();
            plan.businessRules.push(rule);
            plan.positiveTests.push(`Validar ${rule} com dados válidos`);
            plan.negativeTests.push(`Validar falha quando ${rule} não for atendido`);
            plan.boundaryTests.push(`Validar limite relacionado a ${rule}`);
            plan.securityTests.push(`Validar tentativa de burlar ${rule}`);
            plan.risks.push(`Risco caso ${rule} não seja implementado`);
        });
        return plan;
    }
}
exports.PlannerAgent = PlannerAgent;
//# sourceMappingURL=PlannerAgent.js.map