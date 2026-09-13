import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { Config } from '../utils/config';

test('Transfer Funds', async ({ page }) => {

    await page.goto(Config.URL);

    const loginPage = new LoginPage(page);

    await loginPage.login(
        Config.USERNAME,
        Config.PASSWORD
    );

    const transferFundsPage =
        new TransferFundsPage(page);

    await transferFundsPage.transferFunds(
        0,
        1,
        Config.TRANSFER_AMOUNT
    );
});