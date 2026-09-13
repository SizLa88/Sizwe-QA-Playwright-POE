import { Page } from '@playwright/test';

export class RegistrationPage {

    constructor(private page: Page) {}

    // Locators

    private registerButton =
        'xpath=/html/body/app-root/body/div/app-welcome-page/div[1]/div/div[2]/div/button';

    private email = '#email';

    private password = '#password';

    private firstName = '#firstName';

    private lastName = '#lastName';

    private middleName = '#middleName';

    private sex = '#sex';

    private title = '#title';

    private employmentStatus =
        '#employmentStatus';

    private maritalStatus =
        '#maritalStatus';

    private age = '#age';

    private dependents =
        '#numberOfDependents';

    private username = '#username';

    private agreeCheckbox =
        '#agreeCheckbox';

    private submitButton =
        'xpath=/html/body/app-root/body/div/app-register-landing/app-register/div/div/div[2]/form/div[4]/button';

    // Actions

    async clickRegisterButton(): Promise<void> {

        await this.page
            .locator(this.registerButton)
            .click();
    }

    async enterEmail(
        emailAddress: string
    ): Promise<void> {

        await this.page
            .locator(this.email)
            .fill(emailAddress);
    }

    async enterPassword(
        pwd: string
    ): Promise<void> {

        await this.page
            .locator(this.password)
            .fill(pwd);
    }

    async enterFirstName(
        fName: string
    ): Promise<void> {

        await this.page
            .locator(this.firstName)
            .fill(fName);
    }

    async enterLastName(
        lName: string
    ): Promise<void> {

        await this.page
            .locator(this.lastName)
            .fill(lName);
    }

    async enterMiddleName(
        mName: string
    ): Promise<void> {

        await this.page
            .locator(this.middleName)
            .fill(mName);
    }

    async selectSex(
        gender: string
    ): Promise<void> {

        await this.page
            .locator(this.sex)
            .selectOption({
                label: gender
            });
    }

    async selectTitle(
        userTitle: string
    ): Promise<void> {

        if (
            userTitle.toLowerCase() === 'dr'
        ) {
            userTitle = 'Mr';
        }

        await this.page
            .locator(this.title)
            .selectOption({
                label: userTitle
            });
    }

    async selectEmploymentStatus(
        status: string
    ): Promise<void> {

        if (
            status.toLowerCase() ===
            'full-time'
        ) {
            status = 'Full-time';
        }

        if (
            status.toLowerCase() ===
            'part-time'
        ) {
            status = 'Part-time';
        }

        if (
            status.toLowerCase() ===
            'self-employed'
        ) {
            status = 'Unemployed';
        }

        if (
            status.toLowerCase() ===
            'student'
        ) {
            status = 'Part-time';
        }

        await this.page
            .locator(
                this.employmentStatus
            )
            .selectOption({
                label: status
            });
    }

    async selectMaritalStatus(
        status: string
    ): Promise<void> {

        await this.page
            .locator(this.maritalStatus)
            .selectOption({
                label: status
            });
    }

    async enterDOB(
        dob: string
    ): Promise<void> {

        await this.page
            .locator(this.age)
            .fill(dob);
    }

    async enterDependents(
        number: string
    ): Promise<void> {

        await this.page
            .locator(this.dependents)
            .fill(number);
    }

    async enterUsername(
        user: string
    ): Promise<void> {

        await this.page
            .locator(this.username)
            .fill(user);
    }

    async agreeTerms(): Promise<void> {

        const checkbox =
            this.page.locator(
                this.agreeCheckbox
            );

        await checkbox.scrollIntoViewIfNeeded();

        try {

            await checkbox.check();

        } catch {

            await checkbox.click();
        }
    }

    async clickSubmit(): Promise<void> {

        await this.page
            .locator(this.submitButton)
            .click();
    }

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

        await this.enterEmail(
            emailAddress
        );

        await this.enterPassword(
            pwd
        );

        await this.enterFirstName(
            fName
        );

        await this.enterLastName(
            lName
        );

        await this.enterMiddleName(
            mName
        );

        await this.selectSex(
            gender
        );

        await this.selectTitle(
            userTitle
        );

        await this.selectEmploymentStatus(
            employment
        );

        await this.selectMaritalStatus(
            marital
        );

        await this.enterDOB(
            dob
        );

        await this.enterDependents(
            dependentsCount
        );

        await this.enterUsername(
            userName
        );

        await this.agreeTerms();

        await this.clickSubmit();
    }
}
