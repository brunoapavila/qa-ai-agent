import { chromium } from "@playwright/test";
import * as dotenv from "dotenv";
import { DOMAnalyzer } from "../explorer/DOMAnalyzer";

dotenv.config();

export class LoginExecutor {
  async execute() {
    const browser = await chromium.launch({
      headless: false
    });

    const page = await browser.newPage();

    console.log("🌐 Abrindo sistema...");

    await page.goto(process.env.BASE_URL!, {
      waitUntil: "networkidle"
    });

    console.log("✉️ Preenchendo email...");

    await page
      .getByRole("textbox", { name: "E-mail" })
      .fill(process.env.LOGIN_USER!);

    console.log("🔑 Preenchendo senha...");

    await page
      .getByRole("textbox", { name: "Digite sua senha" })
      .fill(process.env.LOGIN_PASSWORD!);

    console.log("🚀 Realizando login...");

    await page
      .getByRole("button", { name: "Entrar" })
      .click();

    await page.waitForTimeout(8000);

    await page.waitForURL(
    url => !url.toString().includes("/login"),
    { timeout: 30000 }
    ).catch(() => {
    console.log("⚠️ Ainda está na tela de login após aguardar.");
    });

    const headingInicio = page.getByRole("heading", { name: "Início" });

    if (await headingInicio.isVisible().catch(() => false)) {
    console.log("✅ Dashboard/Início carregado");
    } else {
    console.log("⚠️ Heading 'Início' não encontrado");
    }

    console.log("📄 Página atual:", page.url());

    const analyzer = new DOMAnalyzer(page);
    const dom = await analyzer.analyze();

    console.log("");
    console.log("🧠 DOM ANALYSIS");
    console.dir(dom, { depth: null });

    await page.screenshot({
      path: "./artifacts/screenshots/home.png",
      fullPage: true
    });

    console.log("✅ Login realizado");
    console.log("📸 Screenshot salvo");

    await page.waitForTimeout(5000);

    return {

    browser,
    page,
    dom

};
  }
}