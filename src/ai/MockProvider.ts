import { AIProvider } from "./AIProvider";
import { AIAnalysis } from "../models/AIAnalysis";

export class MockProvider implements AIProvider {

    async analyze(story: string): Promise<AIAnalysis> {

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