export interface UserStory {
  id: string;
  title: string;
  actor: string;
  goal: string;
  benefit: string;
  acceptanceCriteria: string[];
  businessRules: string[];
}