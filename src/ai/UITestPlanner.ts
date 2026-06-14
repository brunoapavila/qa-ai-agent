import { GeminiProvider } from "./GeminiProvider";

export class UITestPlanner {

    private gemini = new GeminiProvider();

    async plan(
        story: string,
        dom: any
    ) {

        const prompt = `

Você é um QA Senior.

História:

${story}

------------------------------------

DOM DA TELA:

${JSON.stringify(dom,null,2)}

------------------------------------

Baseado nisso gere JSON:

{

"functionalTests":[],

"negativeTests":[],

"securityTests":[],

"playwrightFlows":[]

}

`;

        return await this.gemini.analyze(prompt);

    }

}