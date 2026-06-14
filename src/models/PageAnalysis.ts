export type PageType =
  | "UNKNOWN"
  | "DASHBOARD"
  | "SEARCH"
  | "CRUD_LIST"
  | "CRUD_FORM"
  | "MODAL";

export interface PageAnalysis {

  pageType: PageType;

  title: string;

  possibleActions: string[];

  riskLevel: "LOW" | "MEDIUM" | "HIGH";

}