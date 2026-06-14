import { UserStory } from "../models/UserStory";

export class TestIdeaEngine {

    generate(story: UserStory): string[] {

        const ideas: string[] = [];

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