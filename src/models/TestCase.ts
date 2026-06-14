import { TestStep } from "./TestStep";

export interface TestCase {

    name: string;

    description: string;

    risk:

    | "LOW"

    | "MEDIUM"

    | "HIGH";

    steps: TestStep[];

}