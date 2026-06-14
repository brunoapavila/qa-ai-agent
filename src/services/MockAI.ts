import { AIProvider } from "../models/AIProvider";

export class MockAI implements AIProvider {

    async generate(prompt: string): Promise<string> {

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