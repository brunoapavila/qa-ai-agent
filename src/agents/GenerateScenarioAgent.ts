import { Step } from "../core/Step";
import { Context } from "../core/Context";
import { ScenarioAgent } from "./ScenarioAgent";

export class GenerateScenarioAgent implements Step {

    async execute(context: Context): Promise<void> {

        if (!context.story) {
            throw new Error("Story não encontrada.");
        }

        const generator = new ScenarioAgent();

        context.scenarios = generator.generate(context.story);

        console.log(`✅ ${context.scenarios.length} cenários gerados`);

    }

}