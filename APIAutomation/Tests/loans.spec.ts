import { test, expect } from '@playwright/test';

test('GET Loans', async ({ request }) => {

    const response = await request.get(
        'https://uibank.uipath.com/api/loans'
    );

    expect(response.status()).toBe(200);
});
