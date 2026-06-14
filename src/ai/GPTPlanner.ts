import { GeminiProvider } from "./GeminiProvider";

export class GPTPlanner {
  private gemini = new GeminiProvider();

  async generate(requirement: any) {
    const prompt = `
Você é um QA Senior especialista em testes funcionais.

Com base no requisito abaixo:

${JSON.stringify(requirement, null, 2)}

Gere casos de teste automatizáveis.

REGRAS IMPORTANTES:
- Não gere seletores técnicos.
- Não use nomes como input_nome, button_salvar, menu_usuario.
- Não gere passos de login.
- O login já foi feito pelo sistema.
- Use apenas nomes funcionais visíveis para o usuário.
- Para cadastro de usuário, use targetPage: "Usuários".
- Não use targetPage: "Cadastro de Usuário".
- Exemplo correto de campos: "Nome", "Email", "Empresa", "Perfil".
- Exemplo correto de botões: "Salvar", "Novo Usuário", "Cancelar".
- Exemplo errado: "Input Nome", "Button Login", "link_cadastro_usuario".
- Retorne apenas JSON puro válido.

Formato obrigatório:

{
  "tests": [
    {
      "name": "",
      "description": "",
      "risk": "LOW",
      "targetPage": "",
      "steps": [
        {
          "action": "fill",
          "target": "",
          "value": ""
        },
        {
          "action": "click",
          "target": ""
        },
        {
          "action": "assert",
          "target": ""
        }
      ]
    }
  ]
}

Ações permitidas:
- fill
- click
- select
- assert
`;

    return await this.gemini.analyze(prompt);
  }
}