import { test } from '../fixtures/BaseTest';
import { Config } from '../utils/Config';
import { ExcelReader } from '../utils/ExcelReader';
import { Logger } from '../utils/Logger';

// Pie Chart Reporter
test.use({
    reporter: [['./UIBank/fixtures/PieChartReporter.ts']]
});

// IMPORTANT:
// Prevents Playwright from executing multiple registration records concurrently
test.describe.configure({
    mode: 'serial'
});

test.describe('Data-Driven Multi-Client Registration Pipeline', () => {

    test.beforeAll(async () => {

        Logger.info(
            'Initializing registration pipeline execution engine...'
        );

    });

    const rowCount = ExcelReader.getRowCount();

    console.log(
        `[INFO] Successfully fetched [${rowCount}] records from RegistrationData.xlsx dataset.`
    );

    for (let i = 1; i <= rowCount; i++) {

        const rawUsername = ExcelReader.getCellData(i, 11);

        const targetUsername = rawUsername
            ? rawUsername.trim()
            : `Unknown_Client_Row_${i}`;

        test(
            `Client Registration Matrix Loop - Row ${i} [Username: ${targetUsername}]`,
            async ({ page, registrationPage }) => {

                // Increase timeout from default 60 seconds
                test.setTimeout(180000);

                Logger.info(
                    `▶️ Starting loop execution matrix row ${i} of ${rowCount} for user profile: [${targetUsername}]`
                );

                await page.goto(
                    Config.URL,
                    {
                        waitUntil: 'networkidle',
                        timeout: 120000
                    }
                );

                await registrationPage.clickRegisterButton();

                await registrationPage.enterEmail(
                    ExcelReader.getCellData(i, 0)
                );

                await registrationPage.enterPassword(
                    ExcelReader.getCellData(i, 1)
                );

                await registrationPage.enterFirstName(
                    ExcelReader.getCellData(i, 2)
                );

                await registrationPage.enterLastName(
                    ExcelReader.getCellData(i, 3)
                );

                await registrationPage.enterMiddleName(
                    ExcelReader.getCellData(i, 4)
                );

                await registrationPage.selectSex(
                    ExcelReader.getCellData(i, 5)
                );

                await registrationPage.selectTitle(
                    ExcelReader.getCellData(i, 6)
                );

                await registrationPage.selectEmploymentStatus(
                    ExcelReader.getCellData(i, 7)
                );

                await registrationPage.selectMaritalStatus(
                    ExcelReader.getCellData(i, 8)
                );

                await registrationPage.enterDOB(
                    ExcelReader.getCellData(i, 9)
                );

                await registrationPage.enterDependents(
                    ExcelReader.getCellData(i, 10)
                );

                await registrationPage.enterUsername(
                    targetUsername
                );

                await registrationPage.agreeTerms();

                await registrationPage.clickSubmit();

                Logger.info(
                    `🏁 Successfully completed submission steps for data matrix loop entry profile: [${targetUsername}]`
                );

            }
        );
    }
});