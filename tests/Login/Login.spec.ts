import { test, expect, chromium, Browser, Page } from '@playwright/test';
import Login from '../../.github/Pages/Login/Login';
import login_testdata from '../../TestData/Login_testdata';
// import { generateUniqueEmail } from '../randomnumbergen';
import Loginsingleuser from '../../TestData/logindatawithsingleuser';
import Emptyform from '../../TestData/emptyloginform';


test.describe('User LogIn Functionality', () => {

  let browser: Browser
  let context;
  let login: Login;


  test.beforeEach(async ({ page }) => {

    browser = await chromium.launch({
      // headless: true
    });
    context = await browser.newContext();
    page = await context.newPage();
    test.setTimeout(350000);
    login = new Login(page);
    
    
    // Go to the starting url before each test.
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');

     // Assertions use the expect API.
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });


  test.skip('Verify Successful Login with Valid Credentials', async ({ page }) => {

    try {
    
      // Click on a tab
      await login.ClickonMytab();
  
      // Destructure formData
      const { email, password } = Loginsingleuser.loginS;
      
      // Fill Login form 
      await login.enterlogincredential(email, password);
      console.log("User Credential Entered Successfully.........");

      // Click on the Login button
      await login.clickonloginbutton();
      console.log('User successfully Logged in to the Account......');

      // Verfiy User successfully Logged in 
      await login.verifylogin();
      console.log("User Account Verified......");
      
      //User log out 
      await login.logout();
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test.skip('Verify Login Attempt with Invalid Email', async ({ page }) => {

    try {
    
      // Click on a tab
      await login.ClickonMytab();
  
      // Destructure formData
      const { email, password } = Loginsingleuser.loginS;
      
      // Fill Login form with Invalid Email Address and verify Error message
      await login.enterlogincredential(email, password);
      console.log("User Credential Entered Successfully.........");

      // Click on the Login button
      await login.clickonloginbuttonwithinvaliddata();
      console.log('Page reload successfully..........');

      // Check All the Required Fields
      await login.verifyemailpasswordwarningmessage();
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test.skip('Verify Login Attempt with Invalid Password', async ({ page }) => {

    try {
    
      // Click on a tab
      await login.ClickonMytab();
  
      // Destructure formData
      const { email, password } = Loginsingleuser.loginS;
      
      // Fill Login form with Invalid Password  and verify Error message
      await login.enterlogincredential(email, password);
      console.log("User Credential Entered Successfully.........");

      // Click on the Login button
      await login.clickonloginbuttonwithinvaliddata();
      console.log('Page reload successfully............');

      // Check All the Required Fields
      await login.verifyemailpasswordwarningmessage();
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });


  test.skip(' Verify Error Message for Account Lockout after Multiple Failed Login Attempts', async ({ page }) => {

    try {
    
      // Iterate over each registration form data
      for (const formData of login_testdata.Login_form) {
      // Click on a tab
      await login.ClickonMytab();
  
      // Destructure formData
      const { email, password } = formData;
      
      // Fill Login form with Invalid Password  and verify Error message
      await login.enterlogincredential(email, password);
      console.log("User Credential Entered Successfully.........");

      // Click on the Login button
      await login.clickonloginbuttonwithmultipleattempts();
      console.log('User successfully Logged in to the Account......');

      // Check All the Required Fields
      await login.verifyaccountlockonmultipleattempts();
      }
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });


  test.skip('Verify Login Attempt with Unregistered Email', async ({ page }) => {

    try {
    
      // Click on a tab
      await login.ClickonMytab();
  
      // Destructure formData
      const { email, password } = Loginsingleuser.loginS;
      
      // Fill Login form with Invalid Password  and verify Error message
      await login.enterlogincredential(email, password);
      console.log("User Credential Entered Successfully.........");

      // Click on the Login button
      await login.clickonloginbuttonwithinvaliddata();
      console.log('Page reload successfully......');

      // Check All the Required Fields
      await login.verifyemailpasswordwarningmessage();
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test.skip('Verify Login with Empty Email and Password Fields', async ({ page }) => {

    try {
    
      // Click on a tab
      await login.ClickonMytab();
  
      // Destructure formData
      const { email, password } = Emptyform.Emptyform;
      
      // Fill Login form with Invalid Password  and verify Error message
      await login.enterlogincredential(email, password);
      console.log("User Credential Entered Successfully.........");

      // Click on the Login button
      await login.clickonloginbuttonwithinvaliddata();
      console.log('Page reload successfully............');

      // Check All the Required Fields
      await login.verifyemailpasswordwarningmessage();
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Verify "Forgotten Password" Link Functionality', async ({ page }) => {

    try {
    
      // Click on a tab
      await login.ClickonMytab();

      // Click on the Forgot password link
      await login.clickonforgotpassword();

      // Check forgot password page element 
      await login.verifyforgotpage();

      // Click again the Forgot password link
      await login.clickonforgotpassword();

      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });




});
