import { Locator, Page } from "@playwright/test";

export class SmartLocator {

  constructor(
    private page: Page
  ){}

  async findInput(

    target:string

  ): Promise<Locator | null>{

    const strategies = [

      ()=>

      this.page

      .getByLabel(

        target,

        {

          exact:false

        }

      ),


      ()=>

      this.page

      .getByPlaceholder(

        target

      ),


      ()=>

      this.page

      .locator(

        `input[name*="${target}" i]`

      ),


      ()=>

      this.page

      .locator(

        `input[id*="${target}" i]`

      ),


      ()=>

      this.page

      .locator(

        `[aria-label*="${target}" i]`

      ),


      ()=>

      this.page

      .locator(

        `textarea[name*="${target}" i]`

      ),


      ()=>

      this.page

      .locator(

        `textarea[id*="${target}" i]`

      )

    ];

    for(

      const strategy

      of strategies

    ){

      try{

        const locator =

        strategy()

        .first();

        const count =

        await locator.count();

        if(

          count > 0

        ){

          return locator;

        }

      }

      catch{}

    }

    return null;

  }



  async findButton(

    target:string

  ){

    const strategies=[

      ()=>

      this.page

      .getByRole(

        "button",

        {

          name:target,

          exact:false

        }

      ),


      ()=>

      this.page

      .getByText(

        target,

        {

          exact:false

        }

      ),


      ()=>

      this.page

      .locator(

        `[aria-label*="${target}" i]`

      )

    ];


    for(

      const strategy

      of strategies

    ){

      try{

        const locator=

        strategy()

        .first();

        const count=

        await locator.count();

        if(

          count>0

        ){

          return locator;

        }

      }

      catch{}

    }

    return null;

  }

}