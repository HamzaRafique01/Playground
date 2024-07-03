import { test, expect, chromium, Browser, Page } from '@playwright/test';
import Registration from '../.github/Pages/Registration/Registration';
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


  test('Create Account without checking privacy policy checkbox and verify Error Message', async ({ page }) => {

    try {
      // Click on a tab 
      await registration.ClickonMytab();
  
      // Destructure formData
      const { First_Name, Last_Name, Email, Telephone, Password, Password_Confirm } = Registration_form.Registration_form;
      
      // Fill registration form
      await registration.fillRegistrationForm(First_Name, Last_Name, generateUniqueEmail(Email), Telephone, Password, Password_Confirm);
  
      // Click to continue 
      await registration.clicktoContinue();

      // Check the Privacy policy warning message display on the page
      await registration.agreetothePrivacyPolicy();

      // Check the Privacy policy warning message display on the page
      await registration.requiredFieldsErrorMessage(First_Name, Last_Name, Email, Telephone, Password,Password_Confirm);

    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Attempt Registration After Checking and Unchecking Privacy Policy Multiple Times ', async ({ page }) => {

    try {

      // Click on a tab 
      await registration.ClickonMytab();
  
      // Destructure formData
      const { First_Name, Last_Name, Email, Telephone, Password, Password_Confirm } = Registration_form.Registration_form;
      
      // Fill registration form
      await registration.fillRegistrationForm(First_Name, Last_Name, generateUniqueEmail(Email), Telephone, Password, Password_Confirm);
  
      // Checking and Unchecking Privacy Policy Multiple Times
      await registration.verifyprivacypolicycheckbox();
      await registration.verifyprivacypolicycheckbox();
      await registration.verifyprivacypolicycheckbox();
      await registration.verifyprivacypolicycheckbox();

      // Click to continue 
      await registration.clicktoContinue();

      // Check the Privacy policy warning message display on the page
      await registration.agreetothePrivacyPolicy();

      // // Check All the Required Fields
      await registration.requiredFieldsErrorMessage(First_Name, Last_Name, Email, Telephone, Password,Password_Confirm);

    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });


  test('User checked the Privacy policy checkbox but does not enter any data in the form and verify all the error messages', async ({ page }) => {

    try {
      // Click on a tab 
      await registration.ClickonMytab();

      // Destructure formData
      const { First_Name, Last_Name, Email, Telephone, Password, Password_Confirm } = Registration_form.Registration_form;
  
      // Checking the privacy policy Checkbox
      await registration.verifyprivacypolicycheckbox();
    
      // Click to continue 
      await registration.clicktoContinue();

      // Check the Privacy policy warning message display on the page
      await registration.agreetothePrivacyPolicy();

      // Check All the Required Fields
      await registration.requiredFieldsErrorMessage(First_Name, Last_Name, Email, Telephone, Password,Password_Confirm);


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('User entered the valid and invalid both data on the form and submit the form without checking privacy policy checkbox and verify error messages', async ({ page }) => {

    try {
      // Click on a tab 
      await registration.ClickonMytab();

      // Destructure formData
      const { First_Name, Last_Name, Email, Telephone, Password, Password_Confirm } = Registration_form.Registration_form;

      // Fill registration form
      await registration.fillRegistrationForm(First_Name, Last_Name, generateUniqueEmail(Email), Telephone, Password, Password_Confirm);
    
      // Click to continue 
      await registration.clicktoContinue();

      // Check the Privacy policy warning message display on the page
      await registration.agreetothePrivacyPolicy();

      // Check All the Required Fields
      await registration.requiredFieldsErrorMessage(First_Name, Last_Name, Email, Telephone, Password,Password_Confirm);


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Verify that The user enters the unique Password and Confirm password', async ({ page }) => {

    try {
      // Click on a tab 
      await registration.ClickonMytab();

      // Destructure formData
      const { First_Name, Last_Name, Email, Telephone, Password, Password_Confirm } = Registration_form.Registration_form;

      // Fill registration form
      await registration.fillRegistrationForm(First_Name, Last_Name, generateUniqueEmail(Email), Telephone, Password, Password_Confirm);
    
      // Click to continue 
      await registration.clicktoContinue();

      // Check the Privacy policy warning message display on the page
      await registration.agreetothePrivacyPolicy();

      // Check All the Required Fields
      await registration.requiredFieldsErrorMessage(First_Name, Last_Name, Email, Telephone, Password,Password_Confirm);

      await registration.comparepasswordandCpassword(Password,Password_Confirm);


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });




});
