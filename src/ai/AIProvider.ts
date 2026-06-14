import { AIAnalysis } from "../models/AIAnalysis";

export interface AIProvider {

    analyze(story: string): Promise<AIAnalysis>;

}