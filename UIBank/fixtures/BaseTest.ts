import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { CheckingPage } from '../pages/CheckingPage';
import { SavingsPage } from '../pages/SavingsPage';
import { LoansPage } from '../pages/LoansPage';
import { LoansAccountCheckPage } from '../pages/LoansAccountCheckPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { Logger } from '../utils/Logger';

// Declare unified types for all page object models across your execution suite
export type TestFixtures = {
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    checkingPage: CheckingPage;
    savingsPage: SavingsPage;
    loansPage: LoansPage;
    loansAccountCheckPage: LoansAccountCheckPage;
    transferFundsPage: TransferFundsPage;
};

// Replaces DriverFactory & ThreadLocal mechanics by extending Playwright's sandboxed worker runner
export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
    registrationPage: async ({ page }, use) => { await use(new RegistrationPage(page)); },
    checkingPage: async ({ page }, use) => { await use(new CheckingPage(page)); },
    savingsPage: async ({ page }, use) => { await use(new SavingsPage(page)); },
    loansPage: async ({ page }, use) => { await use(new LoansPage(page)); },
    loansAccountCheckPage: async ({ page }, use) => { await use(new LoansAccountCheckPage(page)); },
    transferFundsPage: async ({ page }, use) => { await use(new TransferFundsPage(page)); },
});

// Replaces TestNG @BeforeMethod setup hook
test.beforeEach(async ({ page }, testInfo) => {
    Logger.info(`[EXTENT] STARTING TEST: ${testInfo.title}`);
});

// Replaces TestNG @AfterMethod teardown hook
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'passed') {
        Logger.info(`[EXTENT] PASS: ${testInfo.title}`);
    } else if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
        Logger.error(`[EXTENT] FAIL: ${testInfo.title}`);
        
        if (testInfo.errors && testInfo.errors.length > 0) {
            const primaryError = testInfo.errors[0];
            const errorMessage = primaryError.stack || primaryError.message || String(primaryError);
            Logger.error(`Failure Diagnostics Stack Trace: ${errorMessage}`);
        }
    }
});

export { expect };
