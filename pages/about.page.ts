import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage, BasePageAssertions } from "./base.page";

export class AboutPage extends BasePage {
	readonly expect: AboutPageAssertions;

	readonly _paraBankDemoWebsiteHeading: Locator;

	constructor(page: Page) {
		super(page);
		this.expect = new AboutPageAssertions(this);

		this._paraBankDemoWebsiteHeading = page.getByRole("heading", { name: "ParaSoft Demo Website" });
	}
}

class AboutPageAssertions extends BasePageAssertions {
	constructor(readonly aboutPage: AboutPage) {
		super(aboutPage);
	}

	async toHaveParaBankDemoWebsiteHeading(): Promise<void> {
		await expect(this.aboutPage._paraBankDemoWebsiteHeading, "Verifying Para Bank Demo Website heading is displayed").toBeVisible({ timeout: 10000 });
	}
}
