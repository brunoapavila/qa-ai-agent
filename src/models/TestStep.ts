export interface TestStep {

    action:

    | "fill"

    | "click"

    | "select"

    | "assert";

    target: string;

    value?: string;

}