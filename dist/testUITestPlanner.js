"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const UITestPlanner_1 = require("./ai/UITestPlanner");
async function main() {
    const planner = new UITestPlanner_1.UITestPlanner();
    const story = fs_1.default.readFileSync("./stories/story.md", "utf8");
    const dom = {
        title: "Dashboard",
        url: "https://front-hmg-recebiveis.lavvi.com.br/dashboard",
        inputs: [],
        buttons: [
            "Novo",
            "Salvar",
            "Cancelar"
        ]
    };
    const result = await planner.plan(story, dom);
    console.dir(result, {
        depth: null
    });
}
main().catch(console.error);
//# sourceMappingURL=testUITestPlanner.js.map