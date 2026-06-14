"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginExecutor = void 0;
const test_1 = require("@playwright/test");
const dotenv = __importStar(require("dotenv"));
const DOMAnalyzer_1 = require("./DOMAnalyzer");
dotenv.config();
class LoginExecutor {
    async execute() {
        const browser = await test_1.chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        console.log("🌐 Abrindo sistema...");
        await page.goto(process.env.BASE_URL, {
            waitUntil: "networkidle"
        });
        console.log("✉️ Preenchendo email...");
        await page
            .getByRole("textbox", { name: "E-mail" })
            .fill(process.env.LOGIN_USER);
        console.log("🔑 Preenchendo senha...");
        await page
            .getByRole("textbox", { name: "Digite sua senha" })
            .fill(process.env.LOGIN_PASSWORD);
        console.log("🚀 Realizando login...");
        await page
            .getByRole("button", { name: "Entrar" })
            .click();
        await page.waitForTimeout(8000);
        await page.waitForURL(url => !url.toString().includes("/login"), { timeout: 30000 }).catch(() => {
            console.log("⚠️ Ainda está na tela de login após aguardar.");
        });
        const headingInicio = page.getByRole("heading", { name: "Início" });
        if (await headingInicio.isVisible().catch(() => false)) {
            console.log("✅ Dashboard/Início carregado");
        }
        else {
            console.log("⚠️ Heading 'Início' não encontrado");
        }
        console.log("📄 Página atual:", page.url());
        const analyzer = new DOMAnalyzer_1.DOMAnalyzer();
        const dom = await analyzer.analyze(page);
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
        await browser.close();
    }
}
exports.LoginExecutor = LoginExecutor;
//# sourceMappingURL=LoginExecutor.js.map