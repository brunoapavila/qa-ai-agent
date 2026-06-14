import { UserStory } from "../models/UserStory";
import { TestScenario } from "../models/TestScenario";

export class ScenarioAgent {

    generate(userStory: UserStory): TestScenario[] {

        const scenarios: TestScenario[] = [];

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