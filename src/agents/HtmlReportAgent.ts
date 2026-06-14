import * as fs from "fs";
import { Step } from "../core/Step";
import { Context } from "../core/Context";

export class HtmlReportAgent implements Step {

    async execute(context: Context): Promise<void> {

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
.map(
(s)=>`

<tr>

<td>${s.id}</td>

<td>${s.title}</td>

<td>${s.priority}</td>

</tr>

`
)
.join("")}

</table>

</body>

</html>
`;

        fs.writeFileSync("./reports/report.html", html);

        console.log("✅ Relatório HTML gerado");

    }

}