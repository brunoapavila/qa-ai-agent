import { RequirementAnalyzer }

from "./brain/RequirementAnalyzer";

const story =

`

Como administrador

Quero cadastrar um usuário

Para permitir acesso ao sistema

`;

const criteria =

`

Nome obrigatório

Email obrigatório

Email único

Empresa obrigatória

Perfil obrigatório

`;

const rules =

`

Apenas administradores podem cadastrar

Usuário inicia como ativo

`;

const analyzer =

new RequirementAnalyzer();

const result =

analyzer.analyze(

story,

criteria,

rules

);

console.log(

JSON.stringify(

result,

null,

2

)

);