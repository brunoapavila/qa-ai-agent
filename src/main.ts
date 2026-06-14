import { QAAgent }

from "./core/QAAgent";


async function main(){

const story=

`

Como administrador

Quero cadastrar um usuário

Para permitir acesso ao sistema

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

Apenas administradores podem cadastrar

`;


const agent =

new QAAgent();


await agent.run(

story,

criteria,

rules

);

}


main();