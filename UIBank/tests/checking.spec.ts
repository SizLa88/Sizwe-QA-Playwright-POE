import { test, expect } from '../fixtures/BaseTest';
import { Config } from '../utils/Config';
import { Logger } from '../utils/Logger';

test.describe('Checking Account Lifecycle Management', () => {
    
    // Replaces: Before hooks / inline login steps across individual tests
    test.beforeEach(async ({ page, loginPage }) => {
        Logger.info('Establishing authenticated browser session context for Checking service modules...');
        
        // Navigate directly to the base application gateway
        await page.goto(Config.URL);
        
        // Logs in and automatically dismisses the privacy policy dialogue popup cleanly
        await loginPage.login(Config.USERNAME, Config.PASSWORD);
    });

    test('Open New Checking Account and Verify Dashboard', async ({ page, checkingPage }) => {
        Logger.info(`Initiating account creation pipeline for entry: [${Config.CHECKING_ACCOUNT_NAME}]`);
        
        // 1. Open the checking account creation form panel
        await checkingPage.clickCheckingAccount();
        
        // 2. Populate form parameters cleanly using the centralized configuration values
        await checkingPage.enterNickname(Config.CHECKING_ACCOUNT_NAME);
        
        // 3. Select 'Checking' from the dropdown using Playwright's native selectOption engine
        await checkingPage.selectCheckingAccount();
        
        // 4. Submit application and navigate back to view new account opened
        await checkingPage.submitApplication();
        await checkingPage.viewAccounts();
        
        Logger.info('Checking account application form successfully processed.');

        // 5. Modern Assertion Endpoint Check
        // Asserts that the client was safely routed back to the core accounts summary view
        await expect(page).toHaveURL(/.*accounts/);
        Logger.info('🏁 Checking account creation workflow successfully verified.');
    });
});
