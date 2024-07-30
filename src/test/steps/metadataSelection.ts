import { Given, When, Then, BeforeAll, Before, After, AfterAll } from '@cucumber/cucumber';
import { expect, Page, Browser, chromium } from '@playwright/test';
import { Client } from 'pg'; // PostgreSQL client library

let page: Page;
let browser: Browser;
let dbClient: Client;

BeforeAll(async function() {
  // This hook runs once before all scenarios in the feature files
  browser = await chromium.launch({ headless: false }); // Set to `true` for headless mode

  // Initialize database connection
  dbClient = new Client({
    user: 'your-username',
    host: 'your-database-host',
    database: 'your-database-name',
    password: 'your-password',
    port: 5432, // Default PostgreSQL port
  });
  await dbClient.connect();
});

Before(async function() {
  // This hook runs before each scenario
  page = await browser.newPage();
  // Optionally, you can use dbClient here to set up test data if needed
});

After(async function() {
  // This hook runs after each scenario
  await page.close();
  // Optionally, you can use dbClient here to clean up test data if needed
});

AfterAll(async function() {
  // This hook runs once after all scenarios in the feature files
  await browser.close();
  
  // Close database connection
  await dbClient.end();
});

Given('I am on the Image field selection page', async function() {
  await page.goto('https://your-website-url/image-field-selection'); // Replace with your actual URL
});

When('I click on the Next arrow button from the production details page', async function() {
  await page.click('selector-for-next-arrow-button'); // Replace with the actual selector
});

When('I see Generate images for native files checkbox disabled', async function() {
  const checkbox = await page.locator('selector-for-generate-images-checkbox'); // Replace with the actual selector
  expect(await checkbox.isDisabled()).toBe(true);
});

When('I click on the field to produce dropdown', async function() {
  await page.click('selector-for-produce-dropdown'); // Replace with the actual selector
});

When('I select {string} format', async function(format: string) {
  await page.selectOption('selector-for-produce-dropdown', format); // Replace with the actual selector and value
});

When('I see Generate images for native files checkbox enabled', async function() {
  const checkbox = await page.locator('selector-for-generate-images-checkbox'); // Replace with the actual selector
  expect(await checkbox.isEnabled()).toBe(true);
});

When('I check Generate images for native files checkbox', async function() {
  await page.check('selector-for-generate-images-checkbox'); // Replace with the actual selector
});

When('I add {string} in the Exclude these native file extention checkbox', async function(excludeExtensions: string) {
  await page.fill('selector-for-exclude-file-extension-input', excludeExtensions); // Replace with the actual selector
});

When('I click on Next button', async function() {
  await page.click('selector-for-next-button'); // Replace with the actual selector
});

Then('I get navigated to the Metadata fields selection screen', async function() {
  await expect(page).toHaveURL('https://your-website-url/metadata-fields-selection'); // Replace with the actual URL
});
