import { Page } from '@playwright/test';

export class LoansAccountCheckPage {

    constructor(private page: Page) {}

    private menuButton = '#dropdownMenuLink';

    private loansMenu =
        'xpath=/html/body/app-root/body/app-nav-menu/header/nav/div/div/ul/li[2]/div/a[1]';

    private existingLoanButton = '#existingButton';

    private quoteIdField = '#quoteID';

    private searchButton =
        'xpath=/html/body/app-root/body/div/app-loan/app-loan-lookup/div/div/div/form/div/div[2]/button';

    async openMenu(): Promise<void> {
        await this.page.locator(this.menuButton).click();
    }

    async openLoansMenu(): Promise<void> {
        await this.page.locator(this.loansMenu).click();
    }

    async clickExistingLoan(): Promise<void> {
        await this.page.locator(this.existingLoanButton).click();
    }

    async enterQuoteId(quoteId: string): Promise<void> {
        await this.page.locator(this.quoteIdField).fill(quoteId);
    }

    async clickSearch(): Promise<void> {
        await this.page.locator(this.searchButton).click();
    }

    async performLoanLookup(
        quoteId: string
    ): Promise<void> {

        await this.openMenu();

        await this.openLoansMenu();

        await this.clickExistingLoan();

        await this.enterQuoteId(quoteId);

        await this.clickSearch();
    }
}