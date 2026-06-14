import {

RequirementAnalyzer

}

from "./brain/RequirementAnalyzer";

import {

GPTPlanner

}

from "./ai/GPTPlanner";


const story=

`

Como administrador

Quero cadastrar um usuário

Para permitir acesso

`;

const criteria=

`

Nome obrigatório

Email obrigatório

Email único

Empresa obrigatória

Perfil obrigatório

`;

const rules=

`

Usuário inicia ativo

`;

const analyzer=

new RequirementAnalyzer();

const req=

analyzer.analyze(

story,

criteria,

rules

);

const planner=

new GPTPlanner();

const tests=

planner.generate(req);

console.log(

JSON.stringify(

tests,

null,

2

)

);