import { test, expect } from '../fixtures/BaseTest';
import { Config } from '../utils/Config';
import { Logger } from '../utils/Logger';

test.describe('Loan Processing Services Pipeline', () => {

    test('Submit Personal Loan Application Form', async ({ page, loansAccountCheckPage, loansPage }) => {
        Logger.info('Beginning personal loan application processing test run...');
        
        // Navigate to the target web landing path gateway
        await page.goto(Config.URL);

        // 1. Traverse menu structure using your page object mappings
        await loansAccountCheckPage.openMenu();
        await loansAccountCheckPage.openLoansMenu();

        // 2. Open forms application panel
        await loansPage.clickApplyButton();

        // 3. Populate form metrics cleanly without manual elementToBeClickable or scroll scripts
        Logger.info('Entering borrower criteria details into form inputs...');
        await loansPage.enterEmail('test@example.com');
        await loansPage.enterAmount('10000');
        await loansPage.selectTerm(3); // Picks index coordinates programmatically
        await loansPage.enterIncome('50000');
        await loansPage.enterAge('38');

        // 4. Dispatch application
        // Playwright auto-scrolls the element into view safely before checking actionability
        await loansPage.clickSubmitButton();
        Logger.info('Form wrapper submitted successfully.');

        // 5. Verification Endpoint Check
        // Asserts that the form has advanced to the dynamic evaluation result view
        await expect(page).toHaveURL(/.*loan/);
        Logger.info('🏁 Open Loan pipeline successfully verified and logged.');
    });
});
