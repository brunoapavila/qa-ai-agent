import { LoginExecutor } from "./executor/LoginExecutor";
import { SystemExplorer } from "./explorer/SystemExplorer";

async function main() {
  const login = new LoginExecutor();

  const result = await login.execute();

  const explorer = new SystemExplorer(result.page);

  await explorer.explore();
}

main();