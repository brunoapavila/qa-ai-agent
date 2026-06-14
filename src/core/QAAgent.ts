import { RequirementAnalyzer }
from "../brain/RequirementAnalyzer";

import { GPTPlanner }
from "../ai/GPTPlanner";

import { LoginExecutor }
from "../executor/LoginExecutor";

import { SystemExplorer }
from "../explorer/SystemExplorer";

import { ExecutionAgent }
from "../executor/ExecutionAgent";

import { ReportAgent }
from "../reporter/ReportAgent";

import {
NavigatorAgent
}
from "../agents/NavigatorAgent";


export class QAAgent {

    private requirementAnalyzer =

    new RequirementAnalyzer();

    private planner =

    new GPTPlanner();

    private loginExecutor =

    new LoginExecutor();

    private reportAgent =

    new ReportAgent();


    async run(

        story:string,

        criteria:string,

        rules:string

    ){

        console.log("");

        console.log(

        "🧠 Entendendo requisitos"

        );

        console.log("");

        const requirement =

        await this

        .requirementAnalyzer

        .analyze(

            story,

            criteria,

            rules

        );

        console.log(

        JSON.stringify(

        requirement,

        null,

        2

        )

        );



        console.log("");

        console.log(

        "🧠 Gerando cenários"

        );

        console.log("");


        const result =

        await this

        .planner

        .generate(

            requirement

        );



        const tests =

        result.tests;



        console.log(

        `✅ ${tests.length}

        cenários gerados`

        );


        console.log("");

        console.log(

        "🌐 Realizando login"

        );

        console.log("");


        const login =

        await this

        .loginExecutor

        .execute();



        console.log("");

        console.log(

        "🗺️ Explorando sistema"

        );

        console.log("");


        const navigator =

        new NavigatorAgent(

        login.page

        );


        await navigator.navigate(
        requirement
        );
        const explorer =
        new SystemExplorer(
        login.page
        );
        await explorer.explore(
        5
        );



        console.log("");

        console.log(

        "🚀 Executando testes"

        );

        console.log("");


        const executor =

        new ExecutionAgent(

            login.page

        );

        await executor

        .execute(

            tests

        );



        console.log("");

        console.log(

        "📄 Gerando relatório"

        );

        console.log("");


        await this

        .reportAgent

        .generate();



        console.log("");

        console.log(

        "🏁 Execução finalizada"

        );

        console.log("");

    }

}