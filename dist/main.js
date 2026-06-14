"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Engine_1 = require("./core/Engine");
const LoadStoryAgent_1 = require("./agents/LoadStoryAgent");
const ParseStoryAgent_1 = require("./agents/ParseStoryAgent");
const GenerateScenarioAgent_1 = require("./agents/GenerateScenarioAgent");
const HtmlReportAgent_1 = require("./agents/HtmlReportAgent");
const TestIdeaAgent_1 = require("./agents/TestIdeaAgent");
const AIAnalysisAgent_1 = require("./agents/AIAnalysisAgent");
const GenerateAITestCasesAgent_1 = require("./agents/GenerateAITestCasesAgent");
async function main() {
    const engine = new Engine_1.Engine();
    engine.add(new LoadStoryAgent_1.LoadStoryAgent());
    engine.add(new ParseStoryAgent_1.ParseStoryAgent());
    engine.add(new GenerateScenarioAgent_1.GenerateScenarioAgent());
    engine.add(new LoadStoryAgent_1.LoadStoryAgent());
    engine.add(new ParseStoryAgent_1.ParseStoryAgent());
    engine.add(new GenerateScenarioAgent_1.GenerateScenarioAgent());
    engine.add(new HtmlReportAgent_1.HtmlReportAgent());
    engine.add(new LoadStoryAgent_1.LoadStoryAgent());
    engine.add(new ParseStoryAgent_1.ParseStoryAgent());
    engine.add(new GenerateScenarioAgent_1.GenerateScenarioAgent());
    engine.add(new TestIdeaAgent_1.TestIdeaAgent());
    engine.add(new HtmlReportAgent_1.HtmlReportAgent());
    engine.add(new LoadStoryAgent_1.LoadStoryAgent());
    engine.add(new ParseStoryAgent_1.ParseStoryAgent());
    engine.add(new GenerateScenarioAgent_1.GenerateScenarioAgent());
    engine.add(new AIAnalysisAgent_1.AIAnalysisAgent());
    engine.add(new HtmlReportAgent_1.HtmlReportAgent());
    engine.add(new LoadStoryAgent_1.LoadStoryAgent());
    engine.add(new ParseStoryAgent_1.ParseStoryAgent());
    engine.add(new AIAnalysisAgent_1.AIAnalysisAgent());
    engine.add(new GenerateAITestCasesAgent_1.GenerateAITestCasesAgent());
    engine.add(new HtmlReportAgent_1.HtmlReportAgent());
    const context = {
        storyText: ""
    };
    await engine.run(context);
    console.log("");
    console.dir(context.story, {
        depth: null
    });
    console.log("");
    console.table(context.scenarios);
}
main().catch(console.error);
//# sourceMappingURL=main.js.map