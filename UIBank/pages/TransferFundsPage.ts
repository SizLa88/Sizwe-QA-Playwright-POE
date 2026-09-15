import { Page, Locator } from '@playwright/test';

// Ensured explicit named export syntax matches your BaseTest fixture expectations perfectly
export class TransferFundsPage {
    private readonly transferMoneyButton: Locator;
    private readonly fromAccountDropdown: Locator;
    private readonly toAccountDropdown: Locator;
    private readonly amountField: Locator;
    private readonly submitTransferButton: Locator;
    private readonly confirmTransferButton: Locator;
    private readonly accountsPageButton: Locator;
    private readonly returnButton: Locator;

    constructor(private readonly page: Page) {
        this.transferMoneyButton = page.locator('#transferMoney');
        this.fromAccountDropdown = page.locator('#fromAccount');
        this.toAccountDropdown = page.locator('#toAccount');
        this.amountField = page.locator('#amountTransferred');
        
        // FIXED: Replaced absolute path with a direct scoped form layout tagging hierarchy
        this.submitTransferButton = page.locator('app-transfer-money form button');
        
        // FIXED: Replaced brittle dynamic dialog absolute XPath with an isolated modal class footer target
        this.confirmTransferButton = page.locator('#exampleModal .modal-footer button').first();
        this.accountsPageButton = page.locator('app-transfer-result a span');
        this.returnButton = page.locator('app-transfer-money a strong');
    }

    async clickTransferMoney(): Promise<void> {
        await this.transferMoneyButton.click();
    }

    /**
     * MAPPED FROM JAVA: Selects option via 0-based index parameters
     */
    async selectFromAccount(index: number): Promise<void> {
        await this.fromAccountDropdown.selectOption({ index });
    }

    /**
     * MAPPED FROM JAVA: Selects option via 0-based index parameters
     */
    async selectToAccount(index: number): Promise<void> {
        await this.toAccountDropdown.selectOption({ index });
    }

    /**
     * FIXED: Playwright's fill() automatically clears the field before entering strings, 
     * eliminating Selenium's explicit .clear() and .sendKeys() command sequence.
     */
    async enterAmount(amount: string): Promise<void> {
        await this.amountField.fill(amount);
    }

    async submitTransfer(): Promise<void> {
        await this.submitTransferButton.click();
    }

    async confirmTransfer(): Promise<void> {
        await this.confirmTransferButton.click();
    }

    async returnToAccountsPage(): Promise<void> {
        await this.accountsPageButton.click();
    }

    async clickReturnButton(): Promise<void> {
        await this.returnButton.click();
    }

    /**
     * Workflow orchestrator method mirroring the multi-step Java business process exactly
     */
    async transferFunds(fromIndex: number, toIndex: number, amount: string): Promise<void> {
        await this.clickTransferMoney();
        await this.selectFromAccount(fromIndex);
        await this.selectToAccount(toIndex);
        await this.enterAmount(amount);
        await this.submitTransfer();
        
        // Optimized state verification ensures the modal has finished rendering before clicking
        await this.confirmTransferButton.waitFor({ state: 'visible' });
        await this.confirmTransfer();
    }
}
