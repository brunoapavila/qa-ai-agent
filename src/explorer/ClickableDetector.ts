import { Locator } from "@playwright/test";

export interface ClickableAnalysis {
  clickable: boolean;
  score: number;
  reason: string;
}

export class ClickableDetector {
  async analyze(element: Locator): Promise<ClickableAnalysis> {
    const text = (await element.innerText().catch(() => "")).trim();

    if (!text) {
      return {
        clickable: false,
        score: 0,
        reason: "Sem texto",
      };
    }

    if (text.length > 80) {
      return {
        clickable: false,
        score: 0,
        reason: "Texto muito longo, provável container",
      };
    }

    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length > 3) {
      return {
        clickable: false,
        score: 0,
        reason: "Muitas linhas, provável container",
      };
    }

    const box = await element.boundingBox().catch(() => null);

    if (!box) {
      return {
        clickable: false,
        score: 0,
        reason: "Sem área visível",
      };
    }

    if (box.width < 30 || box.height < 10) {
      return {
        clickable: false,
        score: 0,
        reason: "Elemento muito pequeno",
      };
    }

    const tag = await element
      .evaluate((el) => el.tagName.toLowerCase())
      .catch(() => "");

    let score = 50;

    if (tag === "button") score += 40;
    if (tag === "a") score += 30;
    if (tag === "span") score += 15;
    if (tag === "div") score += 10;

    return {
      clickable: true,
      score,
      reason: "Elemento provável para clique",
    };
  }
}