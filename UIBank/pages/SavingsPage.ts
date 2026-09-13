import { Page } from '@playwright/test';

export class SavingsPage {

    constructor(private page: Page) {}

    private savingsAccountTile =
        'xpath=/html/body/app-root/body/div/app-account/app-accounts/div/div[1]/div/div/div[1]/div[2]';

    private accountNickname =
        '#accountNickname';

    private savingsAccountOption =
        'xpath=//*[@id="typeOfAccount"]/option[2]';

    private openAccountButton =
        'xpath=/html/body/app-root/body/div/app-account/app-account-apply/div/div[2]/form/button';

    private viewAccountsButton =
        '#viewAccounts';

    async clickSavingsAccount(): Promise<void> {

        await this.page
            .locator(this.savingsAccountTile)
            .click();
    }

    async enterNickname(
        nickname: string
    ): Promise<void> {

        await this.page
            .locator(this.accountNickname)
            .fill(nickname);
    }

    async selectSavingsAccount(): Promise<void> {

        await this.page
            .locator(this.savingsAccountOption)
            .click();
    }

    async submitApplication(): Promise<void> {

        await this.page
            .locator(this.openAccountButton)
            .click();
    }

    async viewAccounts(): Promise<void> {

        await this.page
            .locator(this.viewAccountsButton)
            .click();
    }
}