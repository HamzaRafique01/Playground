import { test, expect, chromium, Browser, Page } from '@playwright/test';
import Registration from '../.github/Pages/Registration/Registration';
import testData from '../TestData/Registrationform';

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
    test.setTimeout(350000);
    registration = new Registration(page);
    
    
    // Go to the starting url before each test.
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');

     // Assertions use the expect API.
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  test('Create Account', async ({ page }) => {

    try {
    
      await registration.ClickonMytab();
  
      const { First_Name, Last_Name, Email, Telephone, Password, Password_Confirm } = testData.Registration_form;

      await registration.fillRegistrationForm(First_Name, Last_Name, Email, Telephone, Password, Password_Confirm);
  
      await registration.clicktoContinue();

      await registration.verifymyaccount();
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });



});