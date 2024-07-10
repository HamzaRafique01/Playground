import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';
import Apple_func from '../../.github/Pages/MegaMenu/Apple_functional';
import Filters from '../../.github/Pages/Common_Module/Filters';
import Loginsingleuser from '../../TestData/logindatawithsingleuser';
import Login from '../../.github/Pages/Login/Login';
import { filter } from 'cypress/types/bluebird';



test.describe('Verify Mega Menu > Apple Page All Scenarios', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let apple_func: Apple_func;
  let filters: Filters;
  let login : Login;

  

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    apple_func = new Apple_func(page);
    filters = new Filters(page);
    login = new Login(page);

    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test.skip('Verify the Mega Menu Navigation', async () => {
    await apple_func.checkMegaMenu();
  });

  test.skip('Check the Page Title', async () => {
    await apple_func.checkMegaMenu();
    await apple_func.verifyPageTitle();
  });

  test.skip('Verify Presence of Apple Products', async () => {
    await apple_func.checkMegaMenu();
    await filters.verifyProductCount();
    await apple_func.verifyAppleProducts();
  });

  test.skip('Verify Add to Cart Functionality', async () => {
    await apple_func.checkMegaMenu();
    await apple_func.checkAddToCartButton();
  });

  test.skip('Verify Sorting Functionality', async () => {
    await apple_func.checkMegaMenu();
    const sort = 'Newest';
    await filters.sortByProducts(sort);
  });

  test.skip('Verify Show Up Functionality', async () => {
    await apple_func.checkMegaMenu();
    const count = '50';
    await filters.showUpProduct(count);
  });

  test.skip('Price Filter By Set Minimum Price Range', async () => {
    await apple_func.checkMegaMenu();
    const min = '400';
    await filters.setMinValue(min);
  });

  test.skip('Price Filter By Set Maximum Price Range', async () => {
    await apple_func.checkMegaMenu();
    const max = '1009'
    await filters.setMaxValue(max);
  });

  test.skip('Search filter visible and functional', async () => {
    await apple_func.checkMegaMenu();
    // Search by Product Name
    const search = 'touch';
    await filters.checkSearchFilter(search);
  });

  test.skip('Color filter visible and functional', async () => {
    await apple_func.checkMegaMenu();
    // Blue, Pink, Black, Orange, Red, Brown, Green, Yellow
    const color = 'Green';
    await filters.checkProductColor(color);
  });

  test.skip('Check Product Availability filter visible and functional', async () => {
    await apple_func.checkMegaMenu();
    // In stock, Out Of Stock, 2-3 Days, Pre-Order
    const availability = 'In stock';
    await filters.checkProductAvailability(availability);
  });

  test.skip('Check Product Size filter visible and functional', async () => {
    await apple_func.checkMegaMenu();
    // L, M, S, XL, XXL
    const size = 'M';
    await filters.checkSizeOfProduct(size);
  });

  test.skip('Check the Next page functionality', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkNextPage();
  });

  test.skip('Check the Previous page functionality', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkPreviousPage();
  });

  test.skip('Check the Custom page functionality', async () => {
    await apple_func.checkMegaMenu();
    const num = '3';
    await filters.checkCustomPage(num);
  });

  test.skip('Verify that the user navigates to the Desktop sub-categories by clicking on the required category link available on the side navigation menu', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkDesktopProducts();
  });

  test.skip('Verify that the user navigates to the Laptops page by clicking on the Laptops link available on the side navigation menu', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkLaptopsProducts();
  });
  
  test.skip('Verify that the user navigates to the Components page by clicking on the Components link available on the side navigation menu', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkComponentsProducts();
  });

  test.skip('Verify that the user navigates to the Tablets page by clicking on the Tablets link available on the side navigation menu', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkTabletsProducts();
  });

  test.skip('Verify that the user navigates to the Software page by clicking on the Software link available on the side navigation menu', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkSoftwareProducts();
  });

  test.skip('Verify that the user navigates to the Phones & PDAs page by clicking on the Phones & PDAs link available on the side navigation menu', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkPhonesPDAsProducts();
  });

  test.skip('Verify that the user navigates to the Cameras page by clicking on the Cameras link available on the side navigation menu', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkCamerasProducts();
  });

  test.skip('Verify that the user navigates to the MP3 Players page by clicking on the MP3 Players link available on the side navigation menu', async () => {
    await apple_func.checkMegaMenu();
    await filters.checkMP3PlayersProducts();
  });

  test.skip('Verify that the user can change the view product displaying on the page grid view to list view', async () => {

    await apple_func.checkMegaMenu();
    await filters.gridToList();    
    
  });

  test.skip('Verify that the user can change the view product displaying on the page list view to grid view', async () => {

    await apple_func.checkMegaMenu();
    await filters.listToGrid();
    
  });

  test('Verify that the user can compare multiple products', async () => {

    await apple_func.checkMegaMenu();

    const productsToCompare = ['iPod Touch', 'iPod Shuffle', 'Apple Cinema 30"'];

    for (const productName of productsToCompare) {
        await filters.addProductToComparison(productName);
    }

    await filters.navigateToComparisonPage();
    await filters.verifyProductsInComparison(productsToCompare);

    
  });

});
