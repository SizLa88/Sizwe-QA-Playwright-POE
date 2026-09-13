import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckingPage } from '../pages/CheckingPage';
import { Config } from '../utils/config';

test('Open Checking Account', async ({ page }) => {

    await page.goto(Config.URL);

    const loginPage = new LoginPage(page);

    await loginPage.login(
        Config.USERNAME,
        Config.PASSWORD
    );

    const checkingPage =
        new CheckingPage(page);

    await checkingPage.clickCheckingAccount();

    await checkingPage.enterNickname(
        Config.CHECKING_ACCOUNT_NAME
    );

    await checkingPage.selectCheckingAccount();

    await checkingPage.submitApplication();

    await checkingPage.viewAccounts();
});
