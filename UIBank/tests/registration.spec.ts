import { test } from '../fixtures/BaseTest';
import { Config } from '../utils/Config';
import { ExcelReader } from '../utils/ExcelReader';
import { Logger } from '../utils/Logger';

test.describe('Data-Driven Multi-Client Registration Pipeline', () => {

    test.beforeAll(async () => {
        Logger.info('Initializing registration pipeline execution engine...');
    });

    // Dynamically captures the maximum physical record count inside the Excel workbook sheet matrix
    const rowCount = ExcelReader.getRowCount();
    
    // Log the spreadsheet layout parse action safely during framework initialisation phases
    console.log(`[INFO] Successfully fetched [${rowCount}] records from RegistrationData.xlsx dataset.`);

    // Loop through each row starting from data row index 1 (skipping header index 0)
    for (let i = 1; i <= rowCount; i++) {
        
        // Extract the target username string beforehand to title the test runner blocks cleanly inside Extent Reports
        const rawUsername = ExcelReader.getCellData(i, 11);
        const targetUsername = rawUsername ? rawUsername.trim() : `Unknown_Client_Row_${i}`;

        // Replaces: @Test(dataProvider = "registrationData") loop execution blocks
        test(`Client Registration Matrix Loop - Row ${i} [Username: ${targetUsername}]`, async ({ page, registrationPage }) => {
            Logger.info(`▶️ Starting loop execution matrix row ${i} of ${rowCount} for user profile: [${targetUsername}]`);
            
            // Navigate directly to the base gateway interface route location
            await page.goto(Config.URL);
            
            // Replaces manual multi-parameter method execution by mapping column cells dynamically
            await registrationPage.clickRegisterButton();

            // Populate text parameters out of the file columns matrix grid sequentially
            await registrationPage.enterEmail(ExcelReader.getCellData(i, 0));
            await registrationPage.enterPassword(ExcelReader.getCellData(i, 1));
            await registrationPage.enterFirstName(ExcelReader.getCellData(i, 2));
            await registrationPage.enterLastName(ExcelReader.getCellData(i, 3));
            await registrationPage.enterMiddleName(ExcelReader.getCellData(i, 4));
            
            // Handle native select dropdown components via matching data labels string arguments
            await registrationPage.selectSex(ExcelReader.getCellData(i, 5));
            await registrationPage.selectTitle(ExcelReader.getCellData(i, 6));
            await registrationPage.selectEmploymentStatus(ExcelReader.getCellData(i, 7));
            await registrationPage.selectMaritalStatus(ExcelReader.getCellData(i, 8));
            
            // Populate numerical and age text criteria controls
            await registrationPage.enterDOB(ExcelReader.getCellData(i, 9));
            await registrationPage.enterDependents(ExcelReader.getCellData(i, 10));
            
            // Pass the extracted clean target username coordinate parameter
            await registrationPage.enterUsername(targetUsername);
            
            // Validate application declarations checkboxes and dispatch actions
            await registrationPage.agreeTerms();
            await registrationPage.clickSubmit();

            Logger.info(`🏁 Successfully completed submission steps for data matrix loop entry profile: [${targetUsername}]`);
        });
    }
});
