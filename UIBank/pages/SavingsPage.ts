import { Page, Locator } from '@playwright/test';

export class SavingsPage {
    private readonly savingsAccountTile: Locator;
    private readonly accountNicknameField: Locator;
    private readonly accountTypeDropdown: Locator;
    private readonly openAccountButton: Locator;
    private readonly viewAccountsButton: Locator;

    constructor(private readonly page: Page) {
        // FIXED: Replaced absolute path with card tracking locator pointing to the second account tile
        this.savingsAccountTile = page.locator('app-accounts div.card').nth(1);
        this.accountNicknameField = page.locator('#accountNickname');
        
        // FIXED: Pointed to the parent select container to allow programmatic option picking
        this.accountTypeDropdown = page.locator('#typeOfAccount');
        this.openAccountButton = page.locator('app-account-apply form button');
        this.viewAccountsButton = page.locator('#viewAccounts');
    }

    async clickSavingsAccount(): Promise<void> {
        await this.savingsAccountTile.click();
    }

    async enterNickname(nickname: string): Promise<void> {
        await this.accountNicknameField.fill(nickname);
    }

    /**
     * FIXED: Interacts with dropdown using native Playwright selectOption API 
     * which bypasses hidden element actionability blocks cleanly.
     */
    async selectSavingsAccount(): Promise<void> {
        await this.accountTypeDropdown.selectOption({ value: 'savings' });
    }

    async submitApplication(): Promise<void> {
        await this.openAccountButton.click();
    }

    async viewAccounts(): Promise<void> {
        await this.viewAccountsButton.click();
    }
}
