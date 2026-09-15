import { test, expect } from '../fixtures/BaseTest';
import { Config } from '../utils/Config';
import { Logger } from '../utils/logger';

test.describe('UIBank Capital Routing Pipeline', () => {

    // Replaces: Before hooks / inline login steps across individual tests
    test.beforeEach(async ({ page, loginPage }) => {
        Logger.info('Establishing secure authorized session context for routing pipeline...');
        
        // Navigate to the base web platform interface
        await page.goto(Config.URL);
        
        // Logs in and automatically dismisses the privacy policy dialog window cleanly
        await loginPage.login(Config.USERNAME, Config.PASSWORD);
    });

    test('Execute Account to Account Transfer Workflow', async ({ page, checkingPage, transferFundsPage }) => {
        Logger.info('Beginning multi-step financial transfer validation run...');

        // 1. Open Accounts Page via structural page object navigation
        // Playwright auto-waits for the dashboard view element to stabilize natively
        await checkingPage.clickCheckingAccount();

        // 2. Execute Transfer Flow via Page Object Wrapper
        // Replaces the SelectByIndex definitions, text entries, and modal submissions completely
        Logger.info(`Routing fund transfer transaction: Amount [${Config.TRANSFER_AMOUNT}]`);
        await transferFundsPage.transferFunds(1, 3, Config.TRANSFER_AMOUNT);

        // 3. Post-Transaction Routing Verification
        Logger.info('Validating post-transfer navigation paths and receipt view...');
        await transferFundsPage.returnToAccountsPage();
        await transferFundsPage.clickReturnButton();

        // 4. Modern Assertion Check
        // Asserts that the client was safely routed back to the main user dashboard landing view
        await expect(page).toHaveURL(/.*account/);
        Logger.info('🏁 Capital transfer pipeline run successfully verified and logged.');
    });
});
