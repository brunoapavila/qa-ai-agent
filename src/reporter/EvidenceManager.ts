import { Page } from "@playwright/test";
import fs from "fs";
import path from "path";

export class EvidenceManager {
  constructor(private page: Page) {}

  async capture(testName: string, status: "PASSED" | "FAILED") {
    const folder = path.resolve("artifacts", "screenshots");

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const safeName = testName
      .replace(/\s+/g, "_")
      .replace(/[^\w]/g, "");

    const file = `${safeName}_${status}.png`;
    const fullPath = path.join(folder, file);

    await this.page.screenshot({
      path: fullPath,
      fullPage: true,
    });

    console.log(`📸 Screenshot salvo: ${fullPath}`);

    return fullPath;
  }
}