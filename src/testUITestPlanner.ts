import fs from "fs";

import { UITestPlanner }

from "./ai/UITestPlanner";

async function main() {

    const planner =

    new UITestPlanner();

    const story = fs.readFileSync(

        "./stories/story.md",

        "utf8"

    );

    const dom = {

        title:

        "Dashboard",

        url:

        "https://front-hmg-recebiveis.lavvi.com.br/dashboard",

        inputs:[],

        buttons:[

            "Novo",

            "Salvar",

            "Cancelar"

        ]

    };

    const result =

    await planner.plan(

        story,

        dom

    );

    console.dir(

        result,

        {

            depth:null

        }

    );

}

main().catch(console.error);