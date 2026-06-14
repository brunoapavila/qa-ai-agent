import { chromium }

from "@playwright/test";

import {

ExecutionAgent

}

from "./executor/ExecutionAgent";


async function main(){

const browser =

await chromium.launch({

headless:false

});

const page =

await browser.newPage();

await page.goto(

"https://google.com"

);


const tests=[

{

name:

"Pesquisar ChatGPT",

description:"",

risk:"LOW",

steps:[

{

action:"fill",

target:"Pesquisar",

value:"ChatGPT"

},

{

action:"assert",

target:"Google"

}

]

}

];


const executor =

new ExecutionAgent(

page

);

await executor.execute(

tests as any

);

}


main();