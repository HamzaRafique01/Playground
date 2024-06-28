import { test, expect, chromium, Browser, Page } from '@playwright/test';
import Registration from '../.github/Pages/Registration/Registration';
import testData, { RegistrationFormData } from '../TestData/testData';
import { generateUniqueEmail } from '../randomnumbergen';



test.describe('Registration', () => {

  let browser: Browser
  let context;
  let registration: Registration;


  test.beforeEach(async ({ page }) => {

    browser = await chromium.launch({
      headless: true
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
      // Iterate over each registration form data
      for (const formData of testData.registrationForms) {

      // Click on a tab (assuming this method is implemented in your registration module)
      await registration.ClickonMytab();
  
      // Destructure formData
      const { firstName, lastName, email, telephone, password, confirmPassword } = formData;

      
      const uniqueEmail = generateUniqueEmail(email);
      console.log(uniqueEmail)
      
      // Fill registration form (assuming this method is implemented in your registration module)
      await registration.fillRegistrationForm(firstName, lastName, await uniqueEmail, telephone, password, confirmPassword);
  
      // Click to continue (assuming this method is implemented in your registration module)
      await registration.clicktoContinue();

  
      // Verify account creation (assuming this method is implemented in your registration module)
      await registration.verifymyaccount();
      } 
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });



});



 