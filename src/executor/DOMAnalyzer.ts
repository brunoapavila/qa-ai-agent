import { Page } from "@playwright/test";
import { PageMap } from "../models/SystemMap";

export class DOMAnalyzer {
  constructor(private page: Page) {}

  async analyze(): Promise<PageMap> {
    const title = await this.page.title();
    const url = this.page.url();

    const buttons = await this.getElements("button");
    const links = await this.getElements("a");
    const inputs = await this.getElements("input");
    const selects = await this.getElements("select");
    const textareas = await this.getElements("textarea");
    const clickables = await this.getClickableElements();

    return {
      title,
      url,
      buttons,
      links,
      inputs,
      selects,
      textareas,
      clickables,
    };
  }

  private async getElements(selector: string) {
    return await this.page.locator(selector).evaluateAll((elements) =>
      elements.map((el) => {
        const html = el as HTMLElement;

        return {
          tag: html.tagName.toLowerCase(),
          type: html.getAttribute("type"),
          text: html.innerText?.trim() || html.textContent?.trim() || null,
          name: html.getAttribute("name"),
          placeholder: html.getAttribute("placeholder"),
          ariaLabel: html.getAttribute("aria-label"),
          role: html.getAttribute("role"),
          href: html.getAttribute("href"),
          selector: html.tagName.toLowerCase(),
        };
      })
    );
  }

  private async getClickableElements() {
    return await this.page.locator("*").evaluateAll((elements) => {
      return elements
        .filter((el) => {
          const html = el as HTMLElement;
          const style = window.getComputedStyle(html);
          const rect = html.getBoundingClientRect();

          const visible = rect.width > 20 && rect.height > 20;

          const hasClickRole =
            html.getAttribute("role") === "button" ||
            html.getAttribute("role") === "menuitem" ||
            html.getAttribute("role") === "link";

          const hasClickAttr =
            html.hasAttribute("onclick") ||
            html.hasAttribute("tabindex") ||
            html.hasAttribute("data-testid");

          const looksClickable =
            style.cursor === "pointer" ||
            html.tagName.toLowerCase() === "button" ||
            html.tagName.toLowerCase() === "a";

          return visible && (hasClickRole || hasClickAttr || looksClickable);
        })
        .map((el) => {
          const html = el as HTMLElement;

          return {
            tag: html.tagName.toLowerCase(),
            type: html.getAttribute("type"),
            text: html.innerText?.trim() || html.textContent?.trim() || null,
            name: html.getAttribute("name"),
            placeholder: html.getAttribute("placeholder"),
            ariaLabel: html.getAttribute("aria-label"),
            role: html.getAttribute("role"),
            href: html.getAttribute("href"),
            selector: html.tagName.toLowerCase(),
          };
        });
    });
  }
}