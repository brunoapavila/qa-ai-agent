import { Page } from "@playwright/test";

export class PageRouter {
  constructor(private page: Page) {}

  async goTo(pageName: string) {
    const normalized = this.normalize(pageName);

    const routes: Record<string, string[]> = {
      usuarios: ["Configurações", "Usuários"],
      usuario: ["Configurações", "Usuários"],
      "cadastro de usuario": ["Configurações", "Usuários"],
      "cadastro de usuarios": ["Configurações", "Usuários"],

      empreendimentos: ["Empreendimentos"],
      "padroes financeiros": ["Empreendimentos", "Padrões Financeiros"],
      "padrões financeiros": ["Empreendimentos", "Padrões Financeiros"],
      financeiro: ["Financeiro"],
    };

    const route = routes[normalized];

    if (!route) {
      throw new Error(`Rota não cadastrada: ${pageName}`);
    }

    console.log(`🧭 Rota encontrada: ${route.join(" > ")}`);

    for (const item of route) {
      await this.clickMenu(item);
      await this.page.waitForTimeout(1200);
    }

    await this.page.waitForLoadState("networkidle").catch(() => {});
  }

  private async clickMenu(text: string) {
    console.log(`➡️ Clicando menu: ${text}`);

    const locator = this.page.getByText(text, { exact: false }).first();

    if (!(await locator.isVisible().catch(() => false))) {
      throw new Error(`Menu não encontrado: ${text}`);
    }

    await locator.scrollIntoViewIfNeeded().catch(() => {});
    await locator.click({ timeout: 8000 });
  }

  private normalize(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }
}