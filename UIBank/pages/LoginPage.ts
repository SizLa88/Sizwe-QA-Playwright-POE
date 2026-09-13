import { Page } from '@playwright/test';

export class LoginPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators

    private usernameField = '#username';

    private passwordField = '#password';

    private loginButton =
        '/html/body/app-root/body/div/app-welcome-page/div[1]/div/div[1]/div/form/div[3]/button';

    private agreementButton =
        "//*[@id='mat-mdc-dialog-0']/div/div/app-agreement-popup/mat-dialog-content/div[2]/button";

    // Methods

    async enterUsername(username: string): Promise<void> {

        await this.page
            .locator(this.usernameField)
            .fill(username);
    }

    async enterPassword(password: string): Promise<void> {

        await this.page
            .locator(this.passwordField)
            .fill(password);
    }

    async clickLogin(): Promise<void> {

        await this.page
            .locator(`xpath=${this.loginButton}`)
            .click();
    }

    async acceptAgreement(): Promise<void> {

        try {

            await this.page
                .locator(`xpath=${this.agreementButton}`)
                .click({
                    timeout: 5000
                });

        } catch {

            console.log(
                'Agreement popup not displayed.'
            );
        }
    }

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLogin();

        await this.acceptAgreement();
    }
}