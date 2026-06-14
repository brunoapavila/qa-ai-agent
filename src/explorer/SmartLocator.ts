import { Locator, Page } from "@playwright/test";

export class SmartLocator {
  async find(page: Page, target: string): Promise<Locator | null> {
    const clean = this.cleanTarget(target);
    const lower = clean.toLowerCase();

    const strategies = [
      () => page.getByRole("button", { name: new RegExp(clean, "i") }),
      () => page.getByRole("link", { name: new RegExp(clean, "i") }),
      () => page.getByText(new RegExp(clean, "i")),
      () => page.getByLabel(clean, { exact: false }),
      () => page.getByPlaceholder(clean),
      () => page.locator(`[aria-label*="${clean}" i]`),
      () => page.locator(`[title*="${clean}" i]`),
      () => page.locator(`[data-testid*="${lower}" i]`),
      () => page.locator(`[id*="${lower}" i]`),
      () => page.locator(`[name*="${lower}" i]`),
    ];

    return await this.findByStrategies(strategies, clean);
  }

  async findInput(page: Page, target: string): Promise<Locator | null> {
    const clean = this.cleanTarget(target);
    const lower = clean.toLowerCase();

    const strategies = [
      () => page.getByLabel(clean, { exact: false }),
      () => page.getByPlaceholder(clean),
      () => page.getByRole("textbox", { name: new RegExp(clean, "i") }),
      () => page.getByRole("combobox", { name: new RegExp(clean, "i") }),
      () => page.locator(`input[placeholder*="${clean}" i]`),
      () => page.locator(`textarea[placeholder*="${clean}" i]`),
      () => page.locator(`input[name*="${lower}" i]`),
      () => page.locator(`input[id*="${lower}" i]`),
      () => page.locator(`textarea[name*="${lower}" i]`),
      () => page.locator(`[aria-label*="${clean}" i]`),
      () => page.locator(`[data-testid*="${lower}" i]`),
    ];

    return await this.findByStrategies(strategies, clean);
  }

  private async findByStrategies(
    strategies: Array<() => Locator>,
    target: string
  ): Promise<Locator | null> {
    for (const strategy of strategies) {
      try {
        const locator = strategy().first();

        if (
          (await locator.count()) > 0 &&
          (await locator.isVisible().catch(() => false))
        ) {
          console.log(`✅ Localizado: ${target}`);
          return locator;
        }
      } catch {}
    }

    console.log(`❌ Não encontrado: ${target}`);
    return null;
  }

  private cleanTarget(target: string): string {
    return target
      .replace(/^input\s+/i, "")
      .replace(/^button\s+/i, "")
      .replace(/^dropdown\s+/i, "")
      .replace(/^menu:\s*/i, "")
      .replace(/^submenu:\s*/i, "")
      .replace(/^campo\s+/i, "")
      .replace(/^botão\s+/i, "")
      .replace(/^botao\s+/i, "")
      .trim();
  }
}