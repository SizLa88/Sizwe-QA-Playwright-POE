import { test, expect } from '@playwright/test';

test('POST Savings', async ({ request }) => {

    const response = await request.post(
        'https://uibank.uipath.com/api/accounts',
        {
            data: {
                accountType: 'Savings',
                name: 'SizweSavings'
            }
        }
    );

    expect(response.ok()).toBeTruthy();
});
