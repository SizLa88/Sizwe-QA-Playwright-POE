import { test, expect } from '@playwright/test';

test('Login Endpoint Validation', async ({ request }) => {

    const response = await request.post(
        'https://uibank.uipath.com/api/auth/login'
    );

    console.log('Status:', response.status());

    expect(response.status()).toBeGreaterThan(0);
});