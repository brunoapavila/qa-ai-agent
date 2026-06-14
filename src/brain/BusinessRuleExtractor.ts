import { UserStory } from "../models/UserStory";

export class BusinessRuleExtractor {

    extract(story: UserStory): string[] {

        const rules: string[] = [];

        story.acceptanceCriteria.forEach(criteria => {

            const text = criteria.toLowerCase();

            if (text.includes("obrigatória") || text.includes("obrigatório")) {

                rules.push(`${criteria} é uma regra obrigatória`);

            }

            if (text.includes("único") || text.includes("única")) {

                rules.push(`${criteria} deve impedir duplicidade`);

            }

            if (text.includes("mínima")) {

                rules.push(`${criteria} deve validar limite mínimo`);

            }

            if (text.includes("máxima")) {

                rules.push(`${criteria} deve validar limite máximo`);

            }

        });

        return [...new Set(rules)];

    }

}