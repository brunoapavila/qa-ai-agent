import { Context }

from "../core/Context";

import { Step }

from "../core/Step";

export class AITestCaseAgent

implements Step {

    async execute(

        context: Context

    ): Promise<void> {

        const analysis =

        context.analysis;

        if(!analysis){

            throw new Error(

                "Analysis não encontrada"

            );

        }

        context.aiTestCases = [];

        let count = 1;

        const add = (

            category:any,

            tests:string[]

        ) => {

            tests.forEach(test=>{

                context.aiTestCases!.push({

                    id:

                    `CT${String(

                        count++

                    ).padStart(

                        3,

                        "0"

                    )}`,

                    category,

                    title:test,

                    steps:[

                        "Abrir página",

                        "Executar fluxo",

                        "Validar resultado"

                    ],

                    expectedResult:

                    "Fluxo executado com sucesso"

                });

            });

        };

        add(

            "FUNCTIONAL",

            analysis.positiveTests

        );

        add(

            "NEGATIVE",

            analysis.negativeTests

        );

        add(

            "BOUNDARY",

            analysis.boundaryTests

        );

        add(

            "SECURITY",

            analysis.securityTests

        );

        console.log("");

        console.log(

            "📝 TEST CASES"

        );

        console.table(

            context.aiTestCases

        );

    }

}