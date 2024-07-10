import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';
import Apple_func from '../../.github/Pages/MegaMenu/Apple_functional';
import Filters from '../../.github/Pages/Common_Module/Filters';
import Desktop from '../../.github/Pages/Desktop/Desktop';



test.describe('Verify Desktop Page Functionality And UI Elements', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let apple_func: Apple_func;
  let filters: Filters;
  let desktop: Desktop;

  

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    apple_func = new Apple_func(page);
    filters = new Filters(page);
    desktop = new Desktop(page);

    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Verify that the user navigation to the Desktop Page from the Mega Menu', async () => {

    await desktop.navigateToDesktop();
  });

  test('Verify that the website logo is displayed correctly', async () => {

    await desktop.navigateToDesktop();
    await desktop.checkLogo();
  });

  test('Verify that "Desktop" is the page title', async () => {

    await desktop.navigateToDesktop();
    await desktop.verifyPageTitle();
  });

  test('Verify that the "Desktop" is the current page name', async () => {

    await desktop.navigateToDesktop();
    await desktop.verifyPageName();
  });

  test('Verify that the Desktop promotion image is visible', async () => {

    await desktop.navigateToDesktop();
    await desktop.verifyimage();
  });

  test('Verify that the Desktop Products are listed on the page', async () => {

    await desktop.navigateToDesktop();
    await filters.verifyProductCount();
    await desktop.verifyDesktopProducts();
  });
 
  test('Verify that the Product Count of the page (Page element Name Show: number 15,25,50,75)', async () => {

    await desktop.navigateToDesktop();
    const count = '50';
    await filters.showUpProduct(count);
  });

  test('Verify that filters are available and work correctly', async ({ page }) => {

    await desktop.navigateToDesktop();
    const search = 'Desktop';
    await desktop.checkFilterList();
  });

  test('Verify that the Product Sorting Options is visible on the page', async () => {

    await desktop.navigateToDesktop();
    const sort = 'Newest';
    await filters.sortByProducts(sort);
  });

  test('Verify that the Filter Functionality by Setting minimum price range is working correctly', async () => {

    await desktop.navigateToDesktop();
    const min = '400';
    await filters.setMinValue(min);
  });

  test('Verify that the Filter Functionality by Setting maximum price range is working correctly', async () => {

    await desktop.navigateToDesktop();
    const max = '1009'
    await filters.setMaxValue(max);
  });

  test('Verify that the manufacturer filter is visible and functional', async ({ page }) => {

    await desktop.navigateToDesktop();
    const product = 'Apple 42';
    await filters.checkManufacturerProducts(product); 
  });

  test('Verify that the Sub Category filter visible and functional', async ({ page }) => {

    await desktop.navigateToDesktop();
    const subcategory = 'Mac 75';
    await filters.checkManufacturerProducts(subcategory);
  });

  test('Verify that the Filter Functionality by Search is working correctly', async ({ page }) => {

    await desktop.navigateToDesktop();
    const search = 'Desktop';
    await desktop.checksearchfilter(search);
  });

  test('Verify that the Filter Functionality by Color is working correctly', async () => {

    await desktop.navigateToDesktop();
    // Blue, Pink, Black, Orange, Red, Brown, Green, Yellow
    const color = 'Green';
    await filters.checkProductColor(color);
  });

  test('Verify that the Filter Functionality by Availability of Stock is working correctly', async () => {

    await desktop.navigateToDesktop();
    // In stock, Out Of Stock, 2-3 Days, Pre-Order
    const availability = 'In stock';
    await filters.checkProductAvailability(availability);
  });

  test('Verify that the Filter Functionality by Size of Product is working correctly', async () => {

    await desktop.navigateToDesktop();
    // L, M, S, XL, XXL
    const size = 'M';
    await filters.checkSizeOfProduct(size);
  });
 
  test('Verify that the user can change the view product displaying on the page grid view to list view', async () => {

    await desktop.navigateToDesktop();
    await filters.gridToList();     
  });

  test('Verify that the user can change the view product displaying on the page list view to grid view', async () => {

    await desktop.navigateToDesktop();
    await filters.listToGrid();
  });

  test('Verify that the breadcrumb navigation path displays the Desktop page path', async () => {

    await desktop.navigateToDesktop();
    const path = 'Desktop';
    await filters.verifybreadcrumbpath(path); 
  });

  test('Verify that the product categories are displayed on the page', async () => {

    await desktop.navigateToDesktop();
    const path = 'Desktop';
    await desktop.verifyDesktopcategories(); 
  });

  test('Verify that the user navigates to the Desktop sub-categories by clicking on the required category link available on the side navigation menu', async () => {

    await desktop.navigateToDesktop();
    await filters.checkDesktopProducts();
  });

  test('Verify that the user navigates to the Laptops page by clicking on the Laptops link available on the side navigation menu', async () => {

    await desktop.navigateToDesktop();
    await filters.checkLaptopsProducts();
  });
  
  test('Verify that the user navigates to the Components page by clicking on the Components link available on the side navigation menu', async () => {

    await desktop.navigateToDesktop();
    await filters.checkComponentsProducts();
  });

  test('Verify that the user navigates to the Tablets page by clicking on the Tablets link available on the side navigation menu', async () => {

    await desktop.navigateToDesktop();
    await filters.checkTabletsProducts();
  });

  test('Verify that the user navigates to the Software page by clicking on the Software link available on the side navigation menu', async () => {

    await desktop.navigateToDesktop();
    await filters.checkSoftwareProducts();
  });

  test('Verify that the user navigates to the Phones & PDAs page by clicking on the Phones & PDAs link available on the side navigation menu', async () => {

    await desktop.navigateToDesktop();
    await filters.checkPhonesPDAsProducts();
  });

  test('Verify that the user navigates to the Cameras page by clicking on the Cameras link available on the side navigation menu', async () => {

    await desktop.navigateToDesktop();
    await filters.checkCamerasProducts();
  });

  test('Verify that the user navigates to the MP3 Players page by clicking on the MP3 Players link available on the side navigation menu', async () => {

    await desktop.navigateToDesktop();
    await filters.checkMP3PlayersProducts();
  });

  test('Verify that the Pagination Functionality by Next button functionality is working correctly', async () => {

    await desktop.navigateToDesktop();
    await filters.checkNextPage();
  });

  test('Verify that the Pagination Functionality by Previous button functionality is working correctly', async () => {

    await desktop.navigateToDesktop();
    await filters.checkPreviousPage();
  });
   
});
