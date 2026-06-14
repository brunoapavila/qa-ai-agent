import { Page } from "@playwright/test";

export class NavigatorAgent {

  constructor(
    private page: Page
  ) {}


  async navigate(

    requirement:any

  ){

    console.log("");

    console.log(

    "🧭 Procurando tela"

    );

    console.log("");



    const feature =

      requirement.feature

      ?.toLowerCase()

      || "";


    const module =

      requirement.module

      ?.toLowerCase()

      || "";


    const menus = [

      {

        parent:

        "Configurações",

        child:

        "Usuários",

        keywords:[

          "usuario",

          "usuários",

          "cadastro"

        ]

      },


      {

        parent:

        "Cadastros",

        child:

        "Empreendimentos",

        keywords:[

          "empreendimento"

        ]

      },


      {

        parent:

        "Financeiro",

        child:

        "Padrões Financeiros",

        keywords:[

          "financeiro"

        ]

      }

    ];



    for(

      const menu

      of menus

    ){

      const found =

      menu.keywords.some(

        keyword=>

        feature.includes(keyword)

        ||

        module.includes(keyword)

      );



      if(

        found

      ){

        console.log(

        `📍 Navegando para:

        ${menu.parent}

        >

        ${menu.child}`

        );



        await this.click(

          menu.parent

        );


        await this.page

        .waitForTimeout(

          1000

        );



        await this.click(

          menu.child

        );


        await this.page

        .waitForLoadState(

          "networkidle"

        )

        .catch(()=>{});


        console.log(

        "✅ Tela aberta"

        );


        return true;

      }

    }


    console.log(

    "⚠️ Tela não mapeada"

    );


    return false;

  }



  private async click(

    text:string

  ){

    const locator =

    this.page

    .getByText(

      text,

      {

        exact:false

      }

    )

    .first();


    await locator

    .scrollIntoViewIfNeeded()

    .catch(()=>{});


    await locator

    .click({

      timeout:5000

    });

  }

}