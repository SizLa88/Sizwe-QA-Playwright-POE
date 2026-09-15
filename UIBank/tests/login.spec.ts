import { test, expect } from '../fixtures/BaseTest';
import { Config } from '../utils/Config';
import { Logger } from '../utils/Logger';

test('UIBank Login Authentication Validation', async ({ page, loginPage }) => {
    Logger.info('Starting standalone login operational verification flow...');
    
    // Navigate straight to the landing portal
    await page.goto(Config.URL);

    // Page object handles input entry and dialogue popup dismissal actions synchronously
    await loginPage.login(Config.USERNAME, Config.PASSWORD);
    Logger.info('Credential payloads sent successfully.');

    // Native assertion check verifies the browser successfully routed past the entry gate
    await expect(page).toHaveURL(/.*account/);
    Logger.info('🏁 Login Authentication successfully verified.');
});
