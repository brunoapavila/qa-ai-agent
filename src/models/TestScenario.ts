export interface TestScenario {

    id: string;

    title: string;

    category: string;

    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

    preConditions: string[];

    steps: string[];

    expectedResult: string;

}