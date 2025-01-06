import { HomePage } from "../pages/home.page";
import { AboutPage } from "../pages/about.page";
import { test } from "../user-setup";
import { expect } from "@playwright/test";

test.describe("Para Bank | Home Page", () => {
	let aboutPage: AboutPage;
	let homePage: HomePage;

	test.beforeEach(async ({ page, baseURL }) => {
		aboutPage = new AboutPage(page);
		homePage = new HomePage(page);

		await homePage.navigateTo(`${baseURL}index.htm`);
	});

	test.describe("homePage", { tag: "@homePage" }, () => {
		test("verify home page elements exist", async ({ username, password, page, baseURL }) => {
			await expect(page).toHaveURL(`${baseURL}index.htm`, { timeout: 25000 });
			await homePage.expect.toHaveCompanyLogo();
			await homePage.expect.toHaveCustomerLoginHeading();
			await homePage.expect.toHaveUsernameInput();
			await homePage.expect.toHavePasswordInput();
			await homePage.expect.toHaveLogInButton();

			/* 
			Could implement the following code if a real log in existed:
				await homePage.performLogin(username, password);
			*/
		});

		test("verify about us page link works", async () => {
			await homePage.clickAboutUsLink();
			await aboutPage.expect.toHaveParaBankDemoWebsiteHeading();
		});
	});
});
