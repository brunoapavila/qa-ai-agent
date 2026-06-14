import { Page } from "@playwright/test";

export class MenuNavigator {

    constructor(
        private page: Page
    ) {}

    async goTo(menu: string) {

        console.log(
            `🧭 Navegando para ${menu}`
        );

        const item = this.page
            .getByText(
                menu,
                {
                    exact: false
                }
            )
            .first();

        await item.waitFor({

            state:"visible",

            timeout:10000

        });

        await item.hover();

        await this.page.waitForTimeout(
            1000
        );

        await item.click();

        await this.page.waitForTimeout(
            2000
        );

        console.log(
            `✅ ${menu} aberto`
        );

        console.log(
            "📄 URL:",
            this.page.url()
        );

    }

}