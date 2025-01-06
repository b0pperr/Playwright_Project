import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./user-setup";
export { expect } from "@playwright/test";

// EDIT the username and password variables below.
const username = "_USERNAME_";
const password = "_PASSWORD_";

export default defineConfig<TestOptions>({
	testDir: "./tests",
	fullyParallel: true,
	expect: {
		timeout: 10000,
		toHaveScreenshot: {
			threshold: 0.4,
			maxDiffPixelRatio: 0.06,
			maxDiffPixels: 40,
		},
	},
	//retries: 1,
	reporter: [["playwright-trx-reporter", { outputFile: "./reporter/test-results.trx" }], ["list", { printSteps: true }], ["html"]],

	use: {
		headless: true,
		ignoreHTTPSErrors: true,
		screenshot: "only-on-failure",
		trace: "on-first-retry",
		testIdAttribute: "test-id",
	},

	/* Configure projects for different environments and browsers */
	projects: [
		//
		///
		// QA Environment
		///
		//
		{
			name: "qa",
			use: {
				...devices["Desktop Edge"],
				channel: "msedge",
				baseURL: "https://parabank.parasoft.com/parabank/",
				username: username,
				password: password,
			},
		},
		//
		///
		// Prod Environment
		///
		//
		{
			name: "prod",
			use: {
				...devices["Desktop Edge"],
				channel: "msedge",
				baseURL: "https://parabank.parasoft.com/parabank/",
				username: username,
				password: password,
			},
		},
		//
		///
		// Chrome Browser
		///
		//
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				channel: "chrome",
				baseURL: "https://parabank.parasoft.com/parabank/",
				username: username,
				password: password,
			},
		},
	],
});
