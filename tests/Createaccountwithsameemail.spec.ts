import { test, expect, chromium, Browser, Page } from '@playwright/test';
import Registration from '../.github/Pages/Registration/Registration';
import testData, { RegistrationFormData } from '../TestData/testData';
import Registration_form from '../TestData/Registrationform';
import { generateUniqueEmail } from '../randomnumbergen';



test.describe('Registration', () => {

  let browser: Browser
  let context;
  let registration: Registration;


  test.beforeEach(async ({ page }) => {

    browser = await chromium.launch({
      // headless: true
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

 
let email = '';


  test('Create Account with uniquw email', async ({ page }) => {

    try {

      await registration.ClickonMytab();
  
      const { First_Name, Last_Name, Email, Telephone, Password, Password_Confirm } = Registration_form.Registration_form;

      console.log(Email);
      email = generateUniqueEmail(Email);
      console.log(email);
      
      // Fill registration form 
      await registration.fillRegistrationForm(First_Name, Last_Name, email, Telephone, Password, Password_Confirm);

      // Check privacy Policy Checkbox
      await registration.verifyprivacypolicycheckbox();

      // Click to continue
      await registration.clicktoContinue();

      // Verify account creation
      await registration.verifymyaccount();
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Create Account with same email again', async ({ page }) => {

    try {

      // Click on a tab 
      await registration.ClickonMytab();
  
      // Destructure formData
      const { First_Name, Last_Name,  Telephone, Password, Password_Confirm } = Registration_form.Registration_form;
      
      // Fill registration form
      console.log("Email saved from the previos Test case........."+email); 
      await registration.fillRegistrationForm(First_Name, Last_Name, email, Telephone, Password, Password_Confirm);
  
       // Check privacy Policy Checkbox
       await registration.verifyprivacypolicycheckbox();

      // Click to continue
      await registration.clicktoContinue();

      // Trying to continue with same email
      await registration.registrationwithsameemail();
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });


});



 