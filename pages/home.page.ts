import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage, BasePageAssertions } from "./base.page";

export class HomePage extends BasePage {
	readonly expect: HomePageAssertions;

	readonly _paraBankLogo: Locator;
	readonly _aboutUsLink: Locator;
	readonly _customerLoginHeading: Locator;
	readonly _usernameInput: Locator;
	readonly _passwordInput: Locator;
	readonly _loginButton: Locator;

	constructor(page: Page) {
		super(page);
		this.expect = new HomePageAssertions(this);

		this._paraBankLogo = page.getByRole("img", { name: "ParaBank" });
		this._aboutUsLink = page.locator("#headerPanel").getByRole("link", { name: "About Us" });
		this._customerLoginHeading = page.getByRole("heading", { name: "Customer Login" });
		this._usernameInput = page.locator('input[name="username"]');
		this._passwordInput = page.locator('input[name="password"]');
		this._loginButton = page.getByRole("button", { name: "Log In" });
	}

	async performLogin(username: string, password: string): Promise<void> {
		await this._usernameInput.fill(username);
		await this._passwordInput.fill(password);
		await this._loginButton.click();
	}

	async clickAboutUsLink(): Promise<void> {
		await this._aboutUsLink.click();
		await this.page.waitForLoadState("domcontentloaded");
	}
}

class HomePageAssertions extends BasePageAssertions {
	constructor(readonly homePage: HomePage) {
		super(homePage);
	}

	async toHaveCompanyLogo(): Promise<void> {
		await expect(this.homePage._paraBankLogo, "Verifying company logo is displayed").toBeVisible({ timeout: 10000 });
	}

	async toHaveCustomerLoginHeading(): Promise<void> {
		await expect(this.homePage._customerLoginHeading, "Verifying customer log in heading is displayed").toBeVisible();
	}

	async toHaveUsernameInput(): Promise<void> {
		await expect(this.homePage._usernameInput, "Verifying username input is displayed").toBeVisible();
	}

	async toHavePasswordInput(): Promise<void> {
		await expect(this.homePage._passwordInput, "Verifying password input is displayed").toBeVisible();
	}

	async toHaveLogInButton(): Promise<void> {
		await expect(this.homePage._loginButton, "Verifying log in button is displayed").toBeVisible();
	}
}
