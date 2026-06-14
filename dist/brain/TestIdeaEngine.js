"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestIdeaEngine = void 0;
class TestIdeaEngine {
    generate(story) {
        const ideas = [];
        story.acceptanceCriteria.forEach(criteria => {
            const rule = criteria.replace("-", "").trim();
            ideas.push(`Validar ${rule}`);
            ideas.push(`Validar ausência de ${rule}`);
            ideas.push(`Validar valor inválido para ${rule}`);
            ideas.push(`Validar limite mínimo de ${rule}`);
            ideas.push(`Validar limite máximo de ${rule}`);
        });
        return ideas;
    }
}
exports.TestIdeaEngine = TestIdeaEngine;
//# sourceMappingURL=TestIdeaEngine.js.map