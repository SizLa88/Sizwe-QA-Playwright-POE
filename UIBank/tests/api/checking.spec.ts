import { test, expect } from '@playwright/test';

test('POST Checking', async ({ request }) => {

    const response = await request.post(
        'https://uibank.uipath.com/api/accounts',
        {
            data: {
                accountType: 'Checking',
                name: 'SizweChecking'
            }
        }
    );

    expect(response.ok()).toBeTruthy();
});