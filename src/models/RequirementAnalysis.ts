export interface RequirementAnalysis {

  module: string;

  feature: string;

  userStory: string;

  acceptanceCriteria: string[];

  businessRules: string[];

  fields: string[];

  validations: string[];

}