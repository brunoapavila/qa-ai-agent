"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginExecutor_1 = require("./executor/LoginExecutor");
async function main() {
    const executor = new LoginExecutor_1.LoginExecutor();
    await executor.execute();
}
main().catch(console.error);
//# sourceMappingURL=testLogin.js.map