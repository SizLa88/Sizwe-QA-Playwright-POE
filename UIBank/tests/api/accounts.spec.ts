import { test, expect } from '@playwright/test';

test('GET Accounts', async ({ request }) => {

    const response = await request.get(
        'https://uibank.uipath.com/api/accounts'
    );

    const body = await response.text();

    console.log('\n===== ACCOUNTS RESPONSE =====');
    console.log('Status:', response.status());
    console.log('Body:', body);

    expect(response.ok()).toBeTruthy();
});