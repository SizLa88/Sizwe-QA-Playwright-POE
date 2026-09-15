import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    private readonly registerButton: Locator;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly middleNameField: Locator;
    private readonly sexDropdown: Locator;
    private readonly titleDropdown: Locator;
    private readonly employmentStatusDropdown: Locator;
    private readonly maritalStatusDropdown: Locator;
    private readonly ageField: Locator; // Elements handle input text dates directly
    private readonly dependentsField: Locator;
    private readonly usernameField: Locator;
    private readonly agreeCheckbox: Locator;
    private readonly submitButton: Locator;

    constructor(private readonly page: Page) {
        this.registerButton = page.locator('app-welcome-page div.col-md-6 button, button:has-text("Register")');
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.firstNameField = page.locator('#firstName');
        this.lastNameField = page.locator('#lastName');
        this.middleNameField = page.locator('#middleName');
        this.sexDropdown = page.locator('#sex');
        this.titleDropdown = page.locator('#title');
        this.employmentStatusDropdown = page.locator('#employmentStatus');
        this.maritalStatusDropdown = page.locator('#maritalStatus');
        this.ageField = page.locator('#age');
        this.dependentsField = page.locator('#numberOfDependents');
        this.usernameField = page.locator('#username');
        this.agreeCheckbox = page.locator('#agreeCheckbox');
        this.submitButton = page.locator('app-register form button[type="submit"]');
    }

    async clickRegisterButton(): Promise<void> {
        await this.registerButton.click();
    }

    async enterEmail(emailAddress: string): Promise<void> {
        await this.emailField.fill(emailAddress);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameField.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameField.fill(lastName);
    }

    async enterMiddleName(middleName: string): Promise<void> {
        await this.middleNameField.fill(middleName);
    }

    async selectSex(gender: string): Promise<void> {
        await this.sexDropdown.selectOption({ label: gender });
    }

    /**
     * MAPPED FROM JAVA: Preserves custom userTitle mapping adjustments
     */
    async selectTitle(userTitle: string): Promise<void> {
        let titleToSelect = userTitle;
        if (userTitle.toLowerCase() === 'dr') {
            titleToSelect = 'Mr';
        }
        await this.titleDropdown.selectOption({ label: titleToSelect });
    }

    /**
     * MAPPED FROM JAVA: Preserves all conditional status conversion logic
     */
    async selectEmploymentStatus(status: string): Promise<void> {
        let statusToSelect = status;

        if (status.toLowerCase() === 'full-time') {
            statusToSelect = 'Full-time';
        } else if (status.toLowerCase() === 'part-time') {
            statusToSelect = 'Part-time';
        } else if (status.toLowerCase() === 'self-employed') {
            statusToSelect = 'Unemployed';
        } else if (status.toLowerCase() === 'student') {
            statusToSelect = 'Part-time';
        }

        await this.employmentStatusDropdown.selectOption({ label: statusToSelect });
    }

    async selectMaritalStatus(status: string): Promise<void> {
        await this.maritalStatusDropdown.selectOption({ label: status });
    }

    async enterDOB(dob: string): Promise<void> {
        await this.ageField.fill(dob);
    }

    async enterDependents(number: string): Promise<void> {
        await this.dependentsField.fill(number);
    }

    async enterUsername(user: string): Promise<void> {
        await this.usernameField.fill(user);
    }

    /**
     * MAPPED FROM JAVA: Automatically scrolls, forces checkbox click, and resolves 
     * element interception errors natively without messy JavascriptExecutor scripts.
     */
    async agreeTerms(): Promise<void> {
        await this.agreeCheckbox.scrollIntoViewIfNeeded();
        // Playwright handles actionability automatically or allows direct forcing if elements overlap
        await this.agreeCheckbox.check({ force: true });
    }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }

    /**
     * Workflow runner orchestration mapping registerNewUser from Java completely
     */
    async registerNewUser(
        emailAddress: string,
        pwd: string,
        fName: string,
        lName: string,
        mName: string,
        gender: string,
        userTitle: string,
        employment: string,
        marital: string,
        dob: string,
        dependentsCount: string,
        userName: string
    ): Promise<void> {
        await this.clickRegisterButton();
        await this.enterEmail(emailAddress);
        await this.enterPassword(pwd);
        await this.enterFirstName(fName);
        await this.enterLastName(lName);
        await this.enterMiddleName(mName);
        await this.selectSex(gender);
        await this.selectTitle(userTitle);
        await this.selectEmploymentStatus(employment);
        await this.selectMaritalStatus(marital);
        await this.enterDOB(dob);
        await this.enterDependents(dependentsCount);
        await this.enterUsername(userName);
        await this.agreeTerms();
        await this.clickSubmit();
    }
}
