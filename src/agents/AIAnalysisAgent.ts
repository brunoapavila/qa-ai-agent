import { Context } from "../core/Context";
import { Step } from "../core/Step";
import { MockProvider } from "../ai/MockProvider";

export class AIAnalysisAgent implements Step {

    async execute(context: Context): Promise<void> {

        const provider = new MockProvider();

        const analysis = await provider.analyze(
            context.storyText
);

        context.analysis = analysis;

        
        console.log("");
        console.log("=================================");
        console.log("🧠 AI ANALYSIS");
        console.log("=================================");

        console.table(analysis.businessRules);

        console.table(analysis.risks);

        console.table(analysis.positiveTests);

        console.table(analysis.negativeTests);

        console.table(analysis.boundaryTests);

        console.table(analysis.securityTests);

        console.log("");

        console.log(
        `✅ ${analysis.businessRules.length} regras encontradas`
);

        console.log(
        `✅ ${analysis.risks.length} riscos encontrados`
);

    }

}