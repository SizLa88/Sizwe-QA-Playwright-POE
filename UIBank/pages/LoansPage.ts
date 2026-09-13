import { Page } from '@playwright/test';

export class LoansPage {

    constructor(private page: Page) {}

    private applyButton = '#applyButton';

    private email = '#email';

    private amount = '#amount';

    private term = '#term';

    private income = '#income';

    private age = '#age';

    private submitButton = '#submitButton';

    async clickApplyButton(): Promise<void> {
        await this.page.locator(this.applyButton).click();
    }

    async enterEmail(
        emailAddress: string
    ): Promise<void> {

        await this.page
            .locator(this.email)
            .fill(emailAddress);
    }

    async enterAmount(
        loanAmount: string
    ): Promise<void> {

        await this.page
            .locator(this.amount)
            .fill(loanAmount);
    }

    async selectTerm(
        index: number
    ): Promise<void> {

        await this.page
            .locator(this.term)
            .selectOption({
                index
            });
    }

    async enterIncome(
        salary: string
    ): Promise<void> {

        await this.page
            .locator(this.income)
            .fill(salary);
    }

    async enterAge(
        applicantAge: string
    ): Promise<void> {

        await this.page
            .locator(this.age)
            .fill(applicantAge);
    }

    async clickSubmitButton(): Promise<void> {

        await this.page
            .locator(this.submitButton)
            .click();
    }
}