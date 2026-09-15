import { Page, Locator } from '@playwright/test';

export class LoansPage {
    private readonly applyButton: Locator;
    private readonly emailField: Locator;
    private readonly amountField: Locator;
    private readonly termDropdown: Locator;
    private readonly incomeField: Locator;
    private readonly ageField: Locator;
    private readonly submitButton: Locator;

    constructor(private readonly page: Page) {
        this.applyButton = page.locator('#applyButton');
        this.emailField = page.locator('#email');
        this.amountField = page.locator('#amount');
        this.termDropdown = page.locator('#term');
        this.incomeField = page.locator('#income');
        this.ageField = page.locator('#age');
        this.submitButton = page.locator('#submitButton');
    }

    async clickApplyButton(): Promise<void> {
        // Enforce implicit check before execution matching original actions behavior
        await this.applyButton.waitFor({ state: 'visible' });
        await this.applyButton.click();
    }

    async enterEmail(emailAddress: string): Promise<void> {
        await this.emailField.fill(emailAddress);
    }

    async enterAmount(loanAmount: string): Promise<void> {
        await this.amountField.fill(loanAmount);
    }

    /**
     * FIXED: Replaces Selenium's Select loanTerm = new Select(...) with modern 0-index parameter mapping [7]
     */
    async selectTerm(index: number): Promise<void> {
        await this.termDropdown.selectOption({ index });
    }

    async enterIncome(salary: string): Promise<void> {
        await this.incomeField.fill(salary);
    }

    async enterAge(applicantAge: string): Promise<void> {
        await this.ageField.fill(applicantAge);
    }

    async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }
}
