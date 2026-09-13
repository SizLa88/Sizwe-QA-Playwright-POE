import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoansPage } from '../pages/LoansPage';
import { Config } from '../utils/config';

test('Loan Application', async ({ page }) => {

    await page.goto(Config.URL);

    const loginPage = new LoginPage(page);

    await loginPage.login(
        Config.USERNAME,
        Config.PASSWORD
    );

    const loanPage =
        new LoansPage(page);

    await loanPage.clickApplyButton();

    await loanPage.enterEmail(
        'sizwe@test.com'
    );

    await loanPage.enterAmount(
        '50000'
    );

    await loanPage.selectTerm(1);

    await loanPage.enterIncome(
        '30000'
    );

    await loanPage.enterAge(
        '35'
    );

    await loanPage.clickSubmitButton();
});