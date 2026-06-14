import { Step } from "../core/Step";
import { Context } from "../core/Context";
import { RequirementAgent } from "./RequirementAgent";

export class ParseStoryAgent implements Step {

    async execute(context: Context): Promise<void> {

        const parser = new RequirementAgent();

        context.story = parser.analyze(context.storyText);

        console.log("✅ História interpretada");

    }

}