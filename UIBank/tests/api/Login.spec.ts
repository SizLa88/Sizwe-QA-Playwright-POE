import { test, expect } from '@playwright/test';

test('POST Login', async ({ request }) => {

  const response = await request.post(
    'https://uibank.uipath.com/api/auth/login',
    {
      data: {
        username: 'testuser',
        password: 'Pass@123'
      }
    }
  );

  console.log(await response.text());

  expect(response.status()).toBe(200);
});