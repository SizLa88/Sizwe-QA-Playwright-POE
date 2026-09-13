import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SavingsPage } from '../pages/SavingsPage';
import { Config } from '../utils/config';

test('Open Savings Account', async ({ page }) => {

    await page.goto(Config.URL);

    const loginPage = new LoginPage(page);

    await loginPage.login(
        Config.USERNAME,
        Config.PASSWORD
    );

    const savingsPage =
        new SavingsPage(page);

    await savingsPage.clickSavingsAccount();

    await savingsPage.enterNickname(
        Config.SAVINGS_ACCOUNT_NAME
    );

    await savingsPage.selectSavingsAccount();

    await savingsPage.submitApplication();

    await savingsPage.viewAccounts();
});