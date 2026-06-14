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
exports.HtmlReportAgent = void 0;
const fs = __importStar(require("fs"));
class HtmlReportAgent {
    async execute(context) {
        const html = `
<!DOCTYPE html>
<html lang="pt-BR">

<head>

<meta charset="UTF-8">

<title>QA AI Report</title>

<style>

body{

font-family:Arial;

margin:40px;

}

table{

width:100%;

border-collapse:collapse;

}

th,td{

border:1px solid #ccc;

padding:8px;

}

th{

background:#f5f5f5;

}

</style>

</head>

<body>

<h1>QA AI AGENT REPORT</h1>

<h2>História</h2>

<p>${context.story?.goal}</p>

<h2>Casos de Teste</h2>

<table>

<tr>

<th>ID</th>

<th>Título</th>

<th>Prioridade</th>

</tr>

${(context.scenarios ?? [])
            .map((s) => `

<tr>

<td>${s.id}</td>

<td>${s.title}</td>

<td>${s.priority}</td>

</tr>

`)
            .join("")}

</table>

</body>

</html>
`;
        fs.writeFileSync("./reports/report.html", html);
        console.log("✅ Relatório HTML gerado");
    }
}
exports.HtmlReportAgent = HtmlReportAgent;
//# sourceMappingURL=HtmlReportAgent.js.map