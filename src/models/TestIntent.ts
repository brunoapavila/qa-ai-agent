export type TestIntentAction =
  | "navigate"
  | "fill"
  | "click"
  | "select"
  | "assert";

export interface TestIntentStep {
  action: TestIntentAction;
  target: string;
  value?: string;
}

export interface TestIntent {
  name: string;
  description: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
  targetPage: string;
  steps: TestIntentStep[];
}