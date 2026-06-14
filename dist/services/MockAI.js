"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAI = void 0;
class MockAI {
    async generate(prompt) {
        return JSON.stringify({
            businessRules: [
                "Email deve ser obrigatório",
                "Email deve ser único"
            ],
            positiveTests: [
                "Cadastrar email válido"
            ],
            negativeTests: [
                "Cadastrar sem email"
            ],
            boundaryTests: [
                "Cadastrar email com 255 caracteres"
            ],
            securityTests: [
                "Tentar SQL Injection"
            ],
            performanceTests: [
                "Cadastrar 1000 usuários"
            ],
            risks: [
                "Duplicidade",
                "Dados inconsistentes"
            ]
        });
    }
}
exports.MockAI = MockAI;
//# sourceMappingURL=MockAI.js.map