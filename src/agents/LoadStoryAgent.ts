import * as fs from "fs";
import { Context } from "../core/Context";
import { Step } from "../core/Step";

export class LoadStoryAgent implements Step {

    async execute(context: Context): Promise<void> {

        context.storyText = fs.readFileSync(
            "./stories/story.md",
            "utf8"
        );

        console.log("✅ História carregada");

    }

}