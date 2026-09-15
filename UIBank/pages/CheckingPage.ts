import { Page, Locator } from '@playwright/test';

export class CheckingPage {
    private readonly checkingAccountTile: Locator;
    private readonly accountNicknameField: Locator;
    private readonly accountTypeDropdown: Locator;
    private readonly openAccountButton: Locator;
    private readonly viewAccountsButton: Locator;

    constructor(private readonly page: Page) {
        // FIXED: Replaced absolute XPath with card tracking locator
        this.checkingAccountTile = page.locator('app-accounts div.card').first();
        this.accountNicknameField = page.locator('#accountNickname');
        
        // FIXED: Pointed directly to the parent <select> combobox to allow modern option picking
        this.accountTypeDropdown = page.locator('#typeOfAccount');
        
        // FIXED: Replaced long structural structural path with direct form tagging hierarchy
        this.openAccountButton = page.locator('app-account-apply form button');
        this.viewAccountsButton = page.locator('#viewAccounts');
    }

    async clickCheckingAccount(): Promise<void> {
        await this.checkingAccountTile.click();
    }

    async enterNickname(nickname: string): Promise<void> {
        await this.accountNicknameField.fill(nickname);
    }

    /**
     * FIXED: Interacts with dropdown using native Playwright selectOption API 
     * which bypasses hidden element actionability blocks cleanly.
     */
    async selectCheckingAccount(): Promise<void> {
        await this.accountTypeDropdown.selectOption({ value: 'checking' });
    }

    async submitApplication(): Promise<void> {
        await this.openAccountButton.click();
    }

    async viewAccounts(): Promise<void> {
        await this.viewAccountsButton.click();
    }
}
