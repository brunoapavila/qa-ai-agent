import { LoginExecutor }

from "./executor/LoginExecutor";

async function main(){

    const executor =

    new LoginExecutor();

    await executor.execute();

}

main().catch(console.error);