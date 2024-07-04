import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';
import Apple_func from '../../.github/Pages/MegaMenu/Apple.functional';
import Filters from '../../.github/Pages/Common_Module/Filters';

test.describe('Verify Mega Menu > Apple Page All Scenarios', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let apple_func: Apple_func;
  let filters: Filters;

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();
    apple_func = new Apple_func(page);
    filters = new Filters(page);

    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Verify the Mega Menu Navigation', async () => {
    await apple_func.checkMegaMenu();
  });

  test('Check the Page Title', async () => {
    await apple_func.checkMegaMenu();
    await apple_func.verifyPageTitle();
  });

  test('Verify Presence of Apple Products', async () => {
    await apple_func.checkMegaMenu();
    await filters.verifyProductCount();
    await apple_func.verifyAppleProducts();
  });

  test('Verify Add to Cart Functionality', async () => {
    await apple_func.checkMegaMenu();
    await apple_func.checkAddToCartButton();
  });

  test('Verify Sorting Functionality', async () => {
    await apple_func.checkMegaMenu();
    const sort = 'Newest';
    await filters.sortByProducts(sort);
  });

  test('Verify Show Up Functionality', async () => {
    await apple_func.checkMegaMenu();
    const count = '50';
    await filters.showUpProduct(count);
  });

  test('Price Filter By Set Minimum Price Range', async () => {
    await apple_func.checkMegaMenu();
    const min = '400';
    await filters.setMinValue(min);
  });

  test('Price Filter By Set Maximum Price Range', async () => {
    await apple_func.checkMegaMenu();
    const max = '1009'
    await filters.setMaxValue(max);
  });

  test('Search filter visible and functional', async () => {
    await apple_func.checkMegaMenu();
    const search = 'touch';
    await filters.checkSearchFilter(search);
  });

  test('Color filter visible and functional', async () => {
    await apple_func.checkMegaMenu();
    const color = 'Green';
    await filters.checkProductColor(color);
  });

  test('Check Product Availability filter visible and functional', async () => {
    await apple_func.checkMegaMenu();
    const availability = 'In stock';
    await filters.checkProductAvailability(availability);
  });

  test('Check Product Size filter visible and functional', async () => {
    await apple_func.checkMegaMenu();
    const size = 'M';
    await filters.checkSizeOfProduct(size);
  });

  test('Check the Next page functionality', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkNextPage();
  });

  test('Check the Previous page functionality', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkPreviousPage();
  });

  test('Check the Custom page functionality', async () => {
    await apple_func.checkMegaMenu();
    const num = '3';
    await filters.checkCustomPage(num);
  });
});














































// import { test, expect, chromium, Browser, Page } from '@playwright/test';
// import Apple_func from '../../.github/Pages/MegaMenu/Apple.functional'
// import Filters from '../../.github/Pages/Common_Module/Filters';



// test.describe('Verify Mega Menu > Apple Page All snerio', () => {

//   let browser: Browser;
//   let context;
//   let apple_func: Apple_func;
//   let pagename: any;
//   let filters: Filters;


//   test.beforeEach(async ({ page }) => {

//     browser = await chromium.launch({
//       // headless: true
//     });
//     context = await browser.newContext();
//     page = await context.newPage();
//     test.setTimeout(350000);
//     apple_func = new Apple_func(page);
    
    
//     // Go to the starting url before each test.
//     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');

//      // Assertions use the expect API.
//     await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
//   });

//   test('Verify the Mega Menu Navigation', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();
  
//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; 
//   }
//   });


//   test('Check the Page Title', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify page Title
//       await apple_func.verifypagetitle(); 
      
//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Verify Presence of Apple Products', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Check the Product count on the page

//       await filters.verifyProductCount();

//       // Verify present product name
//       await apple_func.verifyappleproducts();

      
//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//  test('Verify Add to Cart Functionality', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Check the Add to Cart button
//       await apple_func.checkaddtocartbutton()


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Verify Sorting Functionality', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Check Product details
//       const sortby = 'Newest';
//       await filters.sortByproducts(sortby);
 
//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Verify Show Up Functionality', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify product count
//       const count = '50';
//       await filters.showupproduct(count);

      
//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });


//   test('Price Filter By Set Minimum Price Range', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // set minimum price product
//       // Minimum Price 122
//       const min = '400';
//       await filters.setMinValue(min);


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });


//   test('Price Filter By Set Maximum Price Range', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // set maximum price product
//       // Maximum Price 2000
//       const max = '1000';
//       await filters.setMaxValue(max);
 


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });


//   test('Search filter visible and functional', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify the Search filter visible
//       const search = 'touch';
//       await filters.checkSearchFilter(search);


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Color filter visible and functional', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify the Color filter visible
//       // Colors: Blue, Green, Orange, Pink, Red
//       const color = 'Green';
//       await filters.checkProductColor(color);


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Check Product Availability filter visible and functional', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify the Availablity filter visible
//       // AVAILABILITY: In stock, Out Of Stock
//       const availble = 'In stock';
//       await filters.checkProductAvailability(availble);


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Check Product Size filter visible and functional', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify the Size filter visible
//       // Sizes:  L,M,S,XL,XXl
//       const size = 'M';
//       await filters.checkSizeOfProduct(size);


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Check the Next page functionality', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify the pagination functionality is working
//       await filters.checkNextPage();


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Check the Previos page functionality', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify the pagination functionality is working
//       await filters.checkPreviousPage();


//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });

//   test('Check the Custom page functionality', async ({ page }) => {

//     try {
    
//       // Hover over Mega Menu then Click on Apple from the dropdown
//       await apple_func.checkmegamenu();

//       // Verify the pagination functionality is working
//       // Change the number to page specific page
//       const num = '3';
//       await filters.checkCustomPage(num);



//     } catch (error) {
//     // Handle errors
//     console.error('Test case failed:', error);
//     throw error; // Rethrow the error to mark the test case as failed
//   }
//   });








  

// });
