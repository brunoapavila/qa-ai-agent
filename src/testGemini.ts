import * as fs from "fs";

import { GeminiProvider } from "./ai/GeminiProvider";

async function main() {

    const story = fs.readFileSync(

        "./stories/story.md",

        "utf8"

    );

    const gemini = new GeminiProvider();

    const analysis = await gemini.analyze(story);

    console.log("");

    console.log("🧠 AI ANALYSIS");

    console.log("");

    console.dir(

        analysis,

        {

            depth: null

        }

    );

}

main().catch(console.error);