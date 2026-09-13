import { Page } from '@playwright/test';

export class CheckingPage {

    constructor(private page: Page) {}

    private checkingAccountTile =
        'xpath=/html/body/app-root/body/div/app-account/app-accounts/div/div[1]/div/div/div[1]/div[2]';

    private accountNickname = '#accountNickname';

    private checkingAccountOption =
        'xpath=//*[@id="typeOfAccount"]/option[1]';

    private openAccountButton =
        'xpath=/html/body/app-root/body/div/app-account/app-account-apply/div/div[2]/form/button';

    private viewAccountsButton =
        '#viewAccounts';

    async clickCheckingAccount(): Promise<void> {
        await this.page.locator(this.checkingAccountTile).click();
    }

    async enterNickname(
        nickname: string
    ): Promise<void> {

        await this.page
            .locator(this.accountNickname)
            .fill(nickname);
    }

    async selectCheckingAccount(): Promise<void> {

        await this.page
            .locator(this.checkingAccountOption)
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