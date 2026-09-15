import { Page, Locator } from '@playwright/test';

export class LoginPage {

    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;

    constructor(private readonly page: Page) {

        this.usernameField =
            page.locator('#username');

        this.passwordField =
            page.locator('#password');

        this.loginButton =
            page.getByRole('button', {
                name: 'Sign In'
            });
    }

    async enterUsername(
        username: string
    ): Promise<void> {

        await this.usernameField.fill(
            username
        );
    }

    async enterPassword(
        password: string
    ): Promise<void> {

        await this.passwordField.fill(
            password
        );
    }

    async clickLogin(): Promise<void> {

        await this.loginButton.waitFor({
            state: 'visible'
        });

        await this.loginButton.click();
    }

    async acceptAgreement(): Promise<void> {

        try {

            const agreementButton =
                this.page.getByRole('button', {
                    name: /i agree/i
                });

            await agreementButton.waitFor({
                state: 'visible',
                timeout: 10000
            });

            await agreementButton.click();

            console.log(
                'Agreement accepted.'
            );

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

        await this.enterUsername(
            username
        );

        await this.enterPassword(
            password
        );

        await this.clickLogin();

        await this.acceptAgreement();
    }
}