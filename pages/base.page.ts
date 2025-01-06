import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page, Frame } from "@playwright/test";
import { expect } from "@playwright/test";

export class BasePage {
	readonly _loadingScreenText: Locator;
	expect: any;

	constructor(readonly page: Page) {
		this._loadingScreenText = page.getByRole("status").getByText("Please wait while we load");
	}

	async navigateTo(path: string): Promise<void> {
		await this.page.goto(path);
		await this.page.waitForLoadState("networkidle");
	}

	mainFrame() {
		return this.page.frameLocator('iframe[name="Main"]');
	}

	bottomFrame() {
		return this.page.frameLocator('iframe[name="bottom"]');
	}

	main_BottomFrame() {
		return this.page.frameLocator('iframe[name="Main"]').frameLocator('iframe[name="bottom"]');
	}

	async awaitAPIResponse(url: string): Promise<void> {
		// Wait for the API response and verify the status
		const response = await this.page.waitForResponse((response) => response.url().includes(url) && response.status() === 200);

		if (response.status() !== 200) {
			throw new Error(`Expected status 200 but got ${response.status()}`);
		}
	}
}

export class BasePageAssertions {
	constructor(readonly basePage: BasePage) {}

	async toNotHaveAccessibilityViolationsOnPage(page: Page): Promise<void> {
		const accessibilityScanResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();

		expect.soft(accessibilityScanResults.violations, "Accessibility scan").toEqual([]);
	}

	async toHaveShowLoadingScreen(): Promise<void> {
		await expect(this.basePage._loadingScreenText, "Verifying loading screen is displayed").toBeVisible();
	}
}
