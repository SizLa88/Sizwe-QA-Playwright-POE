import { Page, Locator } from '@playwright/test';

export class LoansAccountCheckPage {
    private readonly menuButton: Locator;
    private readonly loansMenuLink: Locator;
    private readonly existingLoanButton: Locator;
    private readonly quoteIdField: Locator;
    private readonly searchButton: Locator;

    constructor(private readonly page: Page) {
        this.menuButton = page.locator('#dropdownMenuLink');
        
        // FIXED: Replaced absolute structural Selenium XPath with a resilient tag layout chain
        this.loansMenuLink = page.locator('app-nav-menu header nav .nav-item .dropdown-item').first();
        this.existingLoanButton = page.locator('#existingButton');
        this.quoteIdField = page.locator('#quoteID');
        
        // FIXED: Replaced fragile absolute structural XPath with component layout isolation targeting
        this.searchButton = page.locator('app-loan-lookup form button');
    }

    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    async openLoansMenu(): Promise<void> {
        await this.loansMenuLink.click();
    }

    async clickExistingLoan(): Promise<void> {
        await this.existingLoanButton.click();
    }

    async enterQuoteId(quoteId: string): Promise<void> {
        await this.quoteIdField.fill(quoteId);
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async performLoanLookup(quoteId: string): Promise<void> {
        await this.openMenu();
        await this.openLoansMenu();
        await this.clickExistingLoan();
        await this.enterQuoteId(quoteId);
        await this.clickSearch();
    }
}
