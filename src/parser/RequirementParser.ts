import { UserStory } from "../models/UserStory";

export class RequirementParser {

    parse(text: string): UserStory {

        return {

            id: "",

            title: "",

            actor: "",

            goal: "",

            benefit: "",

            acceptanceCriteria: [],

            businessRules: []

        };

    }

}