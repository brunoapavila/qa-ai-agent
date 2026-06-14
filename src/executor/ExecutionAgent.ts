import { Page, expect } from "@playwright/test";
import { SmartLocator } from "../explorer/SmartLocator";
import { EvidenceManager } from "../reporter/EvidenceManager";
import { PageRouter } from "../explorer/PageRouter";

export class ExecutionAgent {
  private smartLocator: SmartLocator;
  private evidence: EvidenceManager;
  private router: PageRouter;

  constructor(private page: Page) {
    this.smartLocator = new SmartLocator();
    this.evidence = new EvidenceManager(this.page);
    this.router = new PageRouter(this.page);
  }

  async execute(tests: any[]) {
    console.log("");
    console.log("🚀 Iniciando execução");
    console.log("");

    for (const test of tests) {
      let testStatus: "PASSED" | "FAILED" = "PASSED";

      console.log("");
      console.log("================================");
      console.log(`🧪 ${test.name}`);
      console.log(`📍 Página alvo: ${test.targetPage || "Não informada"}`);
      console.log(`⚠️ Risco: ${test.risk}`);
      console.log("================================");

      try {
        if (test.targetPage) {
          await this.navigate(test.targetPage);
        }

        for (const step of test.steps || []) {
          if (step.action === "navigate") continue;

          switch (step.action) {
            case "fill":
              await this.fill(step.target, step.value || "");
              break;

            case "click":
              await this.click(step.target);
              break;

            case "select":
              await this.select(step.target, step.value || "");
              break;

            case "assert":
              await this.assert(step.target);
              break;

            default:
              console.log(`⚠️ Ação não suportada: ${step.action}`);
              testStatus = "FAILED";
          }
        }
      } catch (error) {
        testStatus = "FAILED";
        console.log("");
        console.log("❌ Erro no cenário");
        console.log(error);
        console.log("");
      }

      await this.evidence.capture(test.name, testStatus);

      if (testStatus === "PASSED") {
        console.log("✅ Cenário finalizado com sucesso");
      } else {
        console.log("⚠️ Cenário finalizado com falhas");
      }
    }
  }

  private async navigate(target: string) {
    console.log(`🧭 Navegando para "${target}"`);
    await this.router.goTo(target);
    console.log("✅ Navegação concluída");
  }

  private async fill(target: string, value: string) {
    console.log(`✍️ Preenchendo "${target}"`);

    const input = await this.smartLocator.findInput(this.page, target);

    if (!input) {
      throw new Error(`Campo "${target}" não encontrado`);
    }

    await input.scrollIntoViewIfNeeded().catch(() => {});
    await input.fill(value);

    console.log(`✅ ${target} preenchido`);
  }

  private async click(target: string) {
    console.log(`🖱️ Clicando "${target}"`);

    const button = await this.smartLocator.find(this.page, target);

    if (!button) {
      throw new Error(`Botão "${target}" não encontrado`);
    }

    await button.scrollIntoViewIfNeeded().catch(() => {});
    await button.click();
    await this.page.waitForTimeout(1000);

    console.log("✅ Clique realizado");
  }

  private async select(target: string, value: string) {
    console.log(`🔽 Selecionando "${target}" = "${value}"`);

    const element = await this.smartLocator.findInput(this.page, target);

    if (!element) {
      throw new Error(`Campo select "${target}" não encontrado`);
    }

    await element.scrollIntoViewIfNeeded().catch(() => {});

    try {
      await element.selectOption({ label: value });
    } catch {
      await element.click();
      await this.page.getByText(value, { exact: false }).click();
    }

    console.log("✅ Seleção realizada");
  }

  private async assert(target: string) {
    console.log(`✅ Validando "${target}"`);

    await expect(
      this.page.getByText(target, {
        exact: false,
      })
    ).toBeVisible({
      timeout: 5000,
    });

    console.log("✅ Assert OK");
  }
}