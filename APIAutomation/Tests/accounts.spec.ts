import { test, expect } from '@playwright/test';

test('GET Accounts', async ({ request }) => {

    const response = await request.get(
        'https://uibank.uipath.com/api/accounts'
    );

    expect(response.status()).toBe(200);
});