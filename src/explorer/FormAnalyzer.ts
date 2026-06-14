import { Page } from "@playwright/test";

export class FormAnalyzer {

  constructor(
    private page: Page
  ) {}

  async analyze() {

    const inputs =
      await this.page
        .locator("input")
        .count();

    const selects =
      await this.page
        .locator("select")
        .count();

    const textareas =
      await this.page
        .locator("textarea")
        .count();

    const buttons =
      await this.page
        .locator("button")
        .count();

    return {

      inputs,

      selects,

      textareas,

      buttons,

      hasForm:

        inputs > 0 ||

        selects > 0 ||

        textareas > 0

    };

  }

}