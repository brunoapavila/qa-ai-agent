"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestIdeaAgent = void 0;
class TestIdeaAgent {
    async execute(context) {
        if (!context.story) {
            throw new Error("Story não encontrada.");
        }
        const ideas = [];
        for (const criterion of context.story.acceptanceCriteria) {
            const rule = criterion.replace("-", "").trim();
            ideas.push({
                category: "POSITIVE",
                title: `Validar ${rule} com dados válidos`
            });
            ideas.push({
                category: "NEGATIVE",
                title: `Validar ausência de ${rule}`
            });
            ideas.push({
                category: "BOUNDARY",
                title: `Validar limite de ${rule}`
            });
            ideas.push({
                category: "SECURITY",
                title: `Validar tentativa de burlar ${rule}`
            });
        }
        console.log("");
        console.log("🧠 IDEIAS GERADAS");
        console.table(ideas);
    }
}
exports.TestIdeaAgent = TestIdeaAgent;
//# sourceMappingURL=TestIdeaAgent.js.map