import { test, expect, chromium, Browser, Page } from '@playwright/test';
import Registration from '../.github/Pages/Registration/Registration';
import testData from '../testData';
import { RandomNumberGenerator } from '../randomnumbergen';


test.describe('Registration', () => {

  let browser: Browser
  let context;
  let registration: Registration;


  test.beforeEach(async ({ page }) => {

    browser = await chromium.launch({
      headless: false
    });
    context = await browser.newContext();
    page = await context.newPage();
    test.setTimeout(150000);
    registration = new Registration(page);
    
    // Go to the starting url before each test.
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');

     // Assertions use the expect API.
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });


  test('Create Account', async ({ page }) => {
    
    await registration.ClickonMytab();

    const { First_Name,Last_Name,Email,Telephone,Password,Password_Confirm } = testData.Registration_form;

    const randomNumber: number = RandomNumberGenerator.generateRandomInteger(10, 1000);
    const newEmail = Email + "-" + randomNumber;


    await registration.datafilling(First_Name,Last_Name,newEmail,Telephone,Password,Password_Confirm);

    await registration.clicktoContinue();
    await registration.verifymyaccount();


  });

});