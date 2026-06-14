import { Page, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
import { DOMAnalyzer } from "./DOMAnalyzer";
import { ClickableDetector } from "./ClickableDetector";
import { SystemMap, PageMap } from "../models/SystemMap";
import { AgentMemory } from "../memory/AgentMemory";
import { RiskAnalyzer } from "../planner/RiskAnalyzer";
import { NavigationMemory } from "../memory/NavigationMemory";

export class SystemExplorer {
  private systemMap: SystemMap;
  private outputPath: string;
  private memory = new AgentMemory();
  private riskAnalyzer = new RiskAnalyzer();
  private clickableDetector = new ClickableDetector();
  private navigationMemory = new NavigationMemory();

  constructor(private page: Page) {
    this.outputPath = path.resolve("reports/system-map.json");

    this.systemMap = {
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pages: [],
    };
  }

  async explore(maxSteps = 10) {
    console.log("🚀 Iniciando exploração universal do sistema");

    await this.ensureReportsFolder();

    for (let step = 1; step <= maxSteps; step++) {
      console.log(`\n🧭 Passo ${step}/${maxSteps}`);

      const currentPage = await this.scanCurrentPage();

      this.addPage(currentPage);
      this.memory.addUrl(currentPage.url);
      this.navigationMemory.addNode(currentPage.url, currentPage.title);
      this.saveMap();
      this.navigationMemory.save();

      const fromUrl = this.page.url();

      const nextElement = await this.findNextSafeClickable();

      if (!nextElement) {
        console.log("✅ Nenhum próximo elemento seguro encontrado.");
        break;
      }

      const text = await this.getElementText(nextElement);
      const actionKey = `${fromUrl}::${text}`;

      this.memory.addAction(actionKey);

      console.log(`🖱️ Clicando em: ${text}`);

      try {
        await nextElement.scrollIntoViewIfNeeded().catch(() => {});

        await Promise.all([
          this.page.waitForLoadState("networkidle").catch(() => {}),
          nextElement.click({ timeout: 5000 }),
        ]);

        await this.page.waitForTimeout(1000);

        const toUrl = this.page.url();
        const newPage = await this.scanCurrentPage();

        this.addPage(newPage);
        this.memory.addUrl(newPage.url);
        this.navigationMemory.addNode(newPage.url, newPage.title);
        this.navigationMemory.addEdge(fromUrl, toUrl, text);
        this.saveMap();
        this.navigationMemory.save();

        console.log(`🔗 Navegação registrada: ${fromUrl} -> ${toUrl}`);
      } catch (error) {
        console.log(`⚠️ Falha ao clicar em: ${text}`);
        continue;
      }
    }

    console.log("✅ Exploração finalizada");
    console.log(`📄 Arquivo gerado: ${this.outputPath}`);
    console.log("🧭 Arquivo gerado: reports/navigation-graph.json");
  }

  private async scanCurrentPage(): Promise<PageMap> {
    console.log("🔍 Analisando tela atual...");

    const analyzer = new DOMAnalyzer(this.page);
    const pageMap = await analyzer.analyze();

    console.log("=================================");
    console.log("Título:", pageMap.title);
    console.log("URL:", pageMap.url);
    console.log("Botões:", pageMap.buttons.length);
    console.log("Links:", pageMap.links.length);
    console.log("Inputs:", pageMap.inputs.length);
    console.log("Selects:", pageMap.selects.length);
    console.log("Textareas:", pageMap.textareas.length);
    console.log("Clicáveis:", pageMap.clickables.length);
    console.log("=================================");

    return pageMap;
  }

  private async findNextSafeClickable(): Promise<Locator | null> {
    const elements = this.page.locator(`
      a,
      button,
      div,
      span,
      [role='button'],
      [role='menuitem'],
      [tabindex],
      [data-testid]
    `);

    const count = await elements.count();

    console.log(`🔎 Elementos navegáveis encontrados: ${count}`);

    for (let i = 0; i < count; i++) {
      const element = elements.nth(i);

      const elementId = await element.getAttribute("id").catch(() => null);
      const role = await element.getAttribute("role").catch(() => null);

      if (elementId === "__next-route-announcer__" || role === "alert") {
        continue;
      }

      if (!(await element.isVisible().catch(() => false))) {
        continue;
      }

      const text = await this.getElementText(element);

      if (!text || text.length < 2) {
        continue;
      }

      const actionKey = `${this.page.url()}::${text}`;

      if (this.memory.hasAction(actionKey)) {
        continue;
      }

      const clickAnalysis = await this.clickableDetector.analyze(element);

      if (!clickAnalysis.clickable) {
        console.log(`❌ Ignorado: ${text} | ${clickAnalysis.reason}`);
        continue;
      }

      const risk = this.riskAnalyzer.analyze(text);

      console.log(
        `✅ ${text} | score=${clickAnalysis.score} | risco=${risk.risk} | permitido=${risk.allowed}`
      );

      if (!risk.allowed) {
        continue;
      }

      return element;
    }

    return null;
  }

  private async getElementText(element: Locator): Promise<string> {
    const text =
      (await element.innerText().catch(() => null)) ||
      (await element.textContent().catch(() => null)) ||
      (await element.getAttribute("aria-label").catch(() => null)) ||
      (await element.getAttribute("title").catch(() => null)) ||
      (await element.getAttribute("data-testid").catch(() => null)) ||
      "";

    return text.trim();
  }

  private addPage(pageMap: PageMap) {
    const alreadyExists = this.systemMap.pages.some(
      (page) => page.url === pageMap.url
    );

    if (!alreadyExists) {
      this.systemMap.pages.push(pageMap);
    }

    this.systemMap.updatedAt = new Date().toISOString();
  }

  private saveMap() {
    fs.writeFileSync(
      this.outputPath,
      JSON.stringify(this.systemMap, null, 2),
      "utf-8"
    );
  }

  private async ensureReportsFolder() {
    const reportsPath = path.resolve("reports");

    if (!fs.existsSync(reportsPath)) {
      fs.mkdirSync(reportsPath);
    }
  }
}