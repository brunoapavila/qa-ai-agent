export interface ExecutionResult {

    scenarioId: string;

    status: "PASS" | "FAIL";

    evidence: string[];

    observations: string;
}