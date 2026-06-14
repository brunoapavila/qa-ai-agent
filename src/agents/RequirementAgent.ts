import { randomUUID } from "crypto";
import { UserStory } from "../models/UserStory";

export class RequirementAgent {

  analyze(text: string): UserStory {

    const lines = text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return {
      id: randomUUID(),
      title: "História de Usuário",
      actor: lines.find(line => line.startsWith("Como")) || "",
      goal: lines.find(line => line.startsWith("Quero")) || "",
      benefit: lines.find(line => line.startsWith("Para")) || "",
      acceptanceCriteria: lines.filter(line => line.startsWith("-")),
      businessRules: []
    };
  }

}