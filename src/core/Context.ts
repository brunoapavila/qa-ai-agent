import { UserStory } from "../models/UserStory";
import { TestScenario } from "../models/TestScenario";

import { AIAnalysis } from "../models/AIAnalysis";

import { AITestCase }
from "../models/AITestCase";



export interface Context {

    storyText: string;

    story?: UserStory;

    scenarios?: TestScenario[];

    analysis?: AIAnalysis;

    aiTestCases?: AITestCase[];

}

