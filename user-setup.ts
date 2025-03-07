import { test as base } from "@playwright/test";

// This is adding options we can use within the playwright.config file
export type TestOptions = {
	username: string;
	password: string;
};

export const test = base.extend<TestOptions>({
	// Define an option and provide a default value.
	// We can later override it in the config.
	username: ["username", { option: true }],
	password: ["password", { option: true }],
});
