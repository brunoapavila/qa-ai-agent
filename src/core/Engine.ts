import { Context } from "./Context";
import { Step } from "./Step";

export class Engine {

    private steps: Step[] = [];

    add(step: Step) {

        this.steps.push(step);

    }

    async run(context: Context) {

        for (const step of this.steps) {

            await step.execute(context);

        }

    }

}