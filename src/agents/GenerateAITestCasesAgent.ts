import { Context } from "../core/Context";
import { Step } from "../core/Step";

export class GenerateAITestCasesAgent implements Step {

    async execute(context: Context): Promise<void> {

        if (!context.analysis) {

            throw new Error(
                "AI Analysis não encontrada."
            );

        }

        let count = 1;

        console.log("");

        console.log(
            "========== TEST CASES =========="
        );

        const printCases = (
            category: string,
            tests: string[]
        ) => {

            tests.forEach(test => {

                console.log("");

                console.log(

                    `CT${String(count).padStart(3,"0")}`

                );

                console.log(

                    `[${category}] ${test}`

                );

                count++;

            });

        };

        printCases(

            "POSITIVE",

            context.analysis.positiveTests

        );

        printCases(

            "NEGATIVE",

            context.analysis.negativeTests

        );

        printCases(

            "BOUNDARY",

            context.analysis.boundaryTests

        );

        printCases(

            "SECURITY",

            context.analysis.securityTests

        );

        console.log("");

        console.log(

            `✅ ${count-1} CTs gerados`

        );

    }

}