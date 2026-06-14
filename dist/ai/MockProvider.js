"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProvider = void 0;
class MockProvider {
    async analyze(story) {
        console.log("Analisando história:");
        console.log(story);
        return {
            businessRules: [
                "Empresa obrigatória",
                "Perfil obrigatório"
            ],
            risks: [
                "Cadastro duplicado"
            ],
            positiveTests: [
                "Cadastrar usuário válido"
            ],
            negativeTests: [
                "Cadastrar sem empresa"
            ],
            boundaryTests: [
                "Nome com 255 caracteres"
            ],
            securityTests: [
                "Tentar SQL Injection no campo nome"
            ]
        };
    }
}
exports.MockProvider = MockProvider;
//# sourceMappingURL=MockProvider.js.map