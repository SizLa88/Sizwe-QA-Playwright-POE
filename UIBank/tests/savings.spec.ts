import { test, expect } from '../fixtures/BaseTest';
import { Config } from '../utils/Config';
import { Logger } from '../utils/logger';

test.describe('Savings Account Lifecycle Management', () => {

    // Replaces: Before hooks / manual login code blocks repeated across Java tests
    test.beforeEach(async ({ page, loginPage }) => {
        Logger.info('Establishing authenticated browser session context for Savings service modules...');
        
        // Navigate directly to the base centralized gateway portal URL
        await page.goto(Config.URL);
        
        // Logs in and automatically dismisses the privacy policy dialogue popup via the custom page object
        await loginPage.login(Config.USERNAME, Config.PASSWORD);
    });

    test('Open New Savings Account and Verify Dashboard', async ({ page, savingsPage }) => {
        Logger.info(`Initiating savings account creation pipeline for entry: [${Config.SAVINGS_ACCOUNT_NAME}]`);

        // 1. Open the savings account form panel (Points to the second account card tile natively)
        await savingsPage.clickSavingsAccount();

        // 2. Populate form parameters using the centralized configuration values
        await savingsPage.enterNickname(Config.SAVINGS_ACCOUNT_NAME);

        // 3. Select 'Savings' from the dropdown using Playwright's native selectOption engine
        // This avoids clicking a hidden option node, preventing hidden actionability crashes
        await savingsPage.selectSavingsAccount();

        // 4. Submit application and navigate back to view new account opened
        await savingsPage.submitApplication();
        await savingsPage.viewAccounts();
        
        Logger.info('Savings account application form successfully processed.');

        // 5. Modern Assertion Endpoint Check
        // Asserts that the client was safely routed back to the core accounts summary view
        await expect(page).toHaveURL(/.*accounts/);
        Logger.info('🏁 Savings account creation workflow successfully verified.');
    });
});
