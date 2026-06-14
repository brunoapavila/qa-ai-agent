import { Locator } from "@playwright/test";

export class ActionExecutor {

    async click(

        element: Locator

    ){

        try{

            await element
                .scrollIntoViewIfNeeded();

            await element
                .click({

                    timeout:5000

                });

            return true;

        }

        catch{

            return false;

        }

    }

}