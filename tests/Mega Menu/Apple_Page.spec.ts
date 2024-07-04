import { test, expect, chromium, Browser, Page } from '@playwright/test';
import Apple_Page from '../../.github/Pages/MegaMenu/Apple';



test.describe('Verify Mega Menu > Apple Page All snerio', () => {

  let browser: Browser;
  let context;
  let apple_Page: Apple_Page;
  let pagename: any;




  test.beforeEach(async ({ page }) => {

    browser = await chromium.launch({
      // headless: true
    });
    context = await browser.newContext();
    page = await context.newPage();
    apple_Page = new Apple_Page(page);
    
    
    // Go to the starting url before each test.
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');

     // Assertions use the expect API.
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });


  test('Verify Mega Menu Navigation to Apple Page', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Verify URL of Apple Page', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Verify Page URL
      await apple_Page.verifyApplepageURL();
      
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Check the current page name', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Verify page Name 
      await apple_Page.verifypagename();
    

      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });


  test('Check the Page Title', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Verify page Title


      await apple_Page.verifypagetitle(); 
      
      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Verify Main Banner image', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Verify promotional image
      await apple_Page.verifyimage();

      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });
  

  test('Verify Presence of Apple Products', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Verify present product name
      await apple_Page.verifyappleproducts();

      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Verify Product Count', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Verify product count
      const count = '50';
      await apple_Page.showupproducts(count);

      
    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Verify Product Sorting Options', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Check Product details
      const sortby = 'Newest';
      await apple_Page.Sortbyproduct(sortby);
 


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });


  test('Set Minimum Price Range', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // set minimum price product
      const min = '400';
      await apple_Page.setminvalue(min);


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });


  test('Set Maximum Price Range', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // set maximum price product
      const max = '1000';
      await apple_Page.setminvalue(max);
 


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Products are listed correctly with , titles, and prices', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Check Product details
      await apple_Page.checkproductdetails();
 


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Check that product images are loading and are of good quality', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Check Product details
      await apple_Page.checkimage();


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('Check the each product title descriptive', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Check Product details
      await apple_Page.checkthetitledescription();
 

    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

  test('The "Add to Cart" button works and adds the product to the cart', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Check the Add to Cart button
      await apple_Page.checkaddtocartbutton()


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });
  
  test('Search filter visible and functional', async ({ page }) => {

    try {
    
      // Hover over Mega Menu then Click on Apple from the dropdown
      await apple_Page.Clickonapplepage();

      // Verify the Search filter visible
      const search = 'touch';
      await apple_Page.checksearchfilter(search);


    } catch (error) {
    // Handle errors
    console.error('Test case failed:', error);
    throw error; // Rethrow the error to mark the test case as failed
  }
  });

});
