import { test, expect } from '@playwright/test';

test('Savings Endpoint Validation', async ({ request }) => {

    const response = await request.post(
        'https://uibank.uipath.com/api/accounts'
    );

    console.log('Status:', response.status());

    expect(response.status()).toBeGreaterThan(0);
});