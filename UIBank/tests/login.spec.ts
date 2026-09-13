import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Config } from '../utils/config';

test('UIBank Login', async ({ page }) => {

    await page.goto(
        Config.URL
    );

    const loginPage =
        new LoginPage(page);

    await loginPage.login(
        Config.USERNAME,
        Config.PASSWORD
    );

    await expect(page).toHaveURL(/.*account/);
});