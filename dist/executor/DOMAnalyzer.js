"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAnalyzer = void 0;
class DOMAnalyzer {
    async analyze(page) {
        const title = await page.title();
        const url = page.url();
        const inputs = await page.locator("input").evaluateAll(elements => elements.map(el => ({
            tag: el.tagName,
            id: el.id,
            name: el.getAttribute("name"),
            placeholder: el.getAttribute("placeholder"),
            type: el.getAttribute("type"),
            ariaLabel: el.getAttribute("aria-label")
        })));
        const buttons = await page.locator("button").evaluateAll(elements => elements.map(el => ({
            text: el.textContent?.trim(),
            ariaLabel: el.getAttribute("aria-label"),
            title: el.getAttribute("title"),
            type: el.getAttribute("type")
        })));
        const links = await page.locator("a").evaluateAll(elements => elements.map(el => ({
            text: el.textContent?.trim(),
            href: el.getAttribute("href"),
            ariaLabel: el.getAttribute("aria-label")
        })));
        const headings = await page.locator("h1,h2,h3,h4,h5,h6").evaluateAll(elements => elements.map(el => ({
            tag: el.tagName,
            text: el.textContent?.trim()
        })));
        const texts = await page.locator("body").innerText();
        return {
            title,
            url,
            headings,
            inputs,
            buttons,
            links,
            visibleText: texts.slice(0, 3000)
        };
    }
}
exports.DOMAnalyzer = DOMAnalyzer;
//# sourceMappingURL=DOMAnalyzer.js.map