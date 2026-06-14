"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioAgent = void 0;
class ScenarioAgent {
    generate(userStory) {
        const scenarios = [];
        userStory.acceptanceCriteria.forEach((criteria, index) => {
            const rule = criteria.replace("-", "").trim();
            scenarios.push({
                id: `CT${String(index + 1).padStart(3, "0")}`,
                title: `Validar ${rule}`,
                category: "Acceptance",
                priority: "HIGH",
                preConditions: [
                    "Usuário autenticado",
                    "Sistema disponível"
                ],
                steps: [
                    "Acessar funcionalidade",
                    `Executar validação de ${rule}`
                ],
                expectedResult: `${rule} deve ser atendido`
            });
        });
        return scenarios;
    }
}
exports.ScenarioAgent = ScenarioAgent;
//# sourceMappingURL=ScenarioAgent.js.map