import { GeminiProvider } from "../ai/GeminiProvider";

export class RequirementAnalyzer {

  private gemini = new GeminiProvider();

  async analyze(

    story:string,

    criteria:string,

    rules:string

  ){

    const prompt = `

História:

${story}

Critérios:

${criteria}

Regras:

${rules}

Extraia:

{

"module":"",

"feature":"",

"fields":[],

"validations":[],

"businessRules":[]

}

`;

    return await this.gemini.analyze(prompt);

  }

}