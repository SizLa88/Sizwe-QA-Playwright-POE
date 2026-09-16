import { test, expect } from '@playwright/test';

test('GET Loans', async ({ request }) => {

    const response = await request.get(
        'https://uibank.uipath.com/api/loans'
    );

    const body = await response.text();

    console.log('\n===== LOANS RESPONSE =====');
    console.log('Status:', response.status());
    console.log('Body:', body);

    expect(response.ok()).toBeTruthy();
});