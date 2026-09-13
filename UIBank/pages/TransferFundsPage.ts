import { Page } from '@playwright/test';

export class TransferFundsPage {

    constructor(private page: Page) {}

    private transferMoneyButton =
        '#transferMoney';

    private fromAccountDropdown =
        '#fromAccount';

    private toAccountDropdown =
        '#toAccount';

    private amountField =
        '#amountTransferred';

    private submitTransferButton =
        'xpath=/html/body/app-root/body/div/app-account/app-transfer-money/div[1]/div[2]/form/div[4]/button';

    private confirmTransferButton =
        'xpath=//*[@id="exampleModal"]/div/div/div[3]/button[1]';

    private accountsPageButton =
        'xpath=/html/body/app-root/body/div/app-account/app-transfer-result/div[1]/div[1]/a/span';

    private returnButton =
        'xpath=/html/body/app-root/body/div/app-account/app-transfer-money/div[1]/div[1]/a/strong';

    async clickTransferMoney(): Promise<void> {

        await this.page
            .locator(this.transferMoneyButton)
            .click();
    }

    async selectFromAccount(
        index: number
    ): Promise<void> {

        await this.page
            .locator(this.fromAccountDropdown)
            .selectOption({ index });
    }

    async selectToAccount(
        index: number
    ): Promise<void> {

        await this.page
            .locator(this.toAccountDropdown)
            .selectOption({ index });
    }

    async enterAmount(
        amount: string
    ): Promise<void> {

        await this.page
            .locator(this.amountField)
            .fill(amount);
    }

    async submitTransfer(): Promise<void> {

        await this.page
            .locator(this.submitTransferButton)
            .click();
    }

    async confirmTransfer(): Promise<void> {

        await this.page
            .locator(this.confirmTransferButton)
            .click();
    }

    async returnToAccountsPage(): Promise<void> {

        await this.page
            .locator(this.accountsPageButton)
            .click();
    }

    async clickReturnButton(): Promise<void> {

        await this.page
            .locator(this.returnButton)
            .click();
    }

    async transferFunds(
        fromIndex: number,
        toIndex: number,
        amount: string
    ): Promise<void> {

        await this.clickTransferMoney();

        await this.selectFromAccount(fromIndex);

        await this.selectToAccount(toIndex);

        await this.enterAmount(amount);

        await this.submitTransfer();

        await this.confirmTransfer();
    }
}