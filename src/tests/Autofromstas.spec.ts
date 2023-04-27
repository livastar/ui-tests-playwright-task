import { expect, test as login } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.USER_PASSWORD;

login('Perform a login for further usage: @auto1', async ({ page }) => {
  await page.goto('https://qa-automation-test-site.firebaseapp.com/login');
  await page.getByLabel('Username *').fill(USERNAME);
  await page.getByLabel('Password *').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Input fields' }).click();
  await page.getByLabel('First name').fill('Gavrilan');
  await page.getByLabel('Long Last Name That Will Be Truncated').fill('Gavrilan Constantin');
  await page.getByLabel('Prefered language').click();
  await page.getByPlaceholder('C#').fill('Javascript');
  await page.getByLabel('Other programming languages').fill('Python');
  await page.getByLabel('Total years experience').fill('4');
  await page.getByLabel('City').fill('Monaco');
  await page.getByRole('button', { name: 'Print details' }).click();


  
});
