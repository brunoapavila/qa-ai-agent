import { Page } from "@playwright/test";

export class PageStateDetector {

    constructor(
        private page: Page
    ){}

    async getState(){

        const url =
            this.page.url();

        const inputs =
            await this.page
                .locator("input")
                .count();

        const buttons =
            await this.page
                .locator("button")
                .count();

        const dialogs =
            await this.page
                .locator(
                    `
                    [role='dialog'],

                    .modal,

                    .MuiDialog-root,

                    .ant-modal
                    `
                )
                .count();

        return {

            url,

            inputs,

            buttons,

            dialogs

        };

    }

    changed(
        oldState:any,

        newState:any

    ){

        return (

            oldState.url !==

            newState.url

            ||

            oldState.inputs !==

            newState.inputs

            ||

            oldState.buttons !==

            newState.buttons

            ||

            oldState.dialogs !==

            newState.dialogs

        );

    }

}