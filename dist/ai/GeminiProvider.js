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
exports.GeminiProvider = void 0;
const genai_1 = require("@google/genai");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class GeminiProvider {
    ai;
    constructor() {
        this.ai = new genai_1.GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
    }
    extractJson(text) {
        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        return JSON.parse(cleanText);
    }
    async analyze(userPrompt) {
        const finalPrompt = `

Você é um QA Senior especialista em:

- Testes Funcionais
- Testes Exploratórios
- Testes API
- Testes Mobile
- Testes de Segurança
- AppSec
- DevSecOps

IMPORTANTE:

- Não utilize markdown
- Não utilize blocos de código
- Retorne apenas JSON puro
- O JSON deve ser válido para JSON.parse()

Formato:

{
"businessRules":[],
"risks":[],
"positiveTests":[],
"negativeTests":[],
"boundaryTests":[],
"securityTests":[]
}

Entrada:

${userPrompt}

`;
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: finalPrompt
        });
        const text = response.text;
        console.log("");
        console.log("========== RAW GEMINI ==========");
        console.log("");
        console.log(text);
        return this.extractJson(text);
    }
}
exports.GeminiProvider = GeminiProvider;
//# sourceMappingURL=GeminiProvider.js.map