import { UserStory } from "../models/UserStory";
import { TestPlan } from "../models/TestPlan";

export class PlannerAgent {

    generate(story: UserStory): TestPlan {

        const plan: TestPlan = {

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

            plan.positiveTests.push(
                `Validar ${rule} com dados válidos`
            );

            plan.negativeTests.push(
                `Validar falha quando ${rule} não for atendido`
            );

            plan.boundaryTests.push(
                `Validar limite relacionado a ${rule}`
            );

            plan.securityTests.push(
                `Validar tentativa de burlar ${rule}`
            );

            plan.risks.push(
                `Risco caso ${rule} não seja implementado`
            );

        });

        return plan;

    }

}