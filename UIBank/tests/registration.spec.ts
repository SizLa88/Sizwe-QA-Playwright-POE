import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { Config } from '../utils/config';

test('Register New User', async ({ page }) => {

    await page.goto(Config.URL);

    const registrationPage =
        new RegistrationPage(page);

    await registrationPage.registerNewUser(
        'newuser@test.com',
        Config.PASSWORD,
        'Sizwe',
        'Ngwenya',
        'QA',
        'Male',
        'Mr',
        'Full-Time',
        'Single',
        '30',
        '0',
        `Sizwe${Date.now()}`
    );
});