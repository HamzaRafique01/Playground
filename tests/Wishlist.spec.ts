import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';
import Filters from '../.github/Pages/Common_Module/Filters';
import Wishlist from '../.github/Pages/Wishlist';
import Login from '../.github/Pages/Login/Login';
import Apple_func from '../.github/Pages/MegaMenu/Apple_functional'
import Loginsingleuser from '../TestData/logindatawithsingleuser';

test.describe('Verify Mega Menu > Apple Page All Scenarios', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let wishlist: Wishlist;
  let filters: Filters;
  let login: Login;
  let apple_func:Apple_func;

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    wishlist = new Wishlist(page);
    filters = new Filters(page);
    login = new Login(page);
    apple_func = new Apple_func(page);

    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Verify that user can navigate to the wishlist from the header menu', async () => {

    await wishlist.checkWishlistByHeader();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // Verify Wishlist page element
    await wishlist.verifyWishlistPage();

    
  });

      

  test('Verify that user can add product to the wishlist', async () => {

    // Click on a tab
    await login.ClickonMytab();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // Navigate to Product page
    await wishlist.checkMegaMenu();

    // Hover on the product
    await wishlist.hoverProduct();

    //Add Product to wishlist
    // const productname = 'iMac';
    await wishlist.addOnWishlist();

    
  });

  test('Verify that user can remove the product from the wishlist', async () => {

    // Click on a tab
    await login.ClickonMytab();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // user navigate to wishlist page from header
    await wishlist.checkWishlistByHeader();

    // Verify Wishlist page element
    await wishlist.verifyWishlistPage();

    // remove the product from wishlist
    await wishlist.removeProduct();

    
  });


  test('Verify that wishlist update when any product add on the wishlist ', async () => {

    // Click on a tab
    await login.ClickonMytab();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // Check wishlist update
    await wishlist.checkWishlistByHeader();

    // Count the number of items in the wishlist
    await wishlist.countWishlistItems();

    // Navigate to Product page
    await wishlist.checkMegaMenu();

    // Hover on the product
    await wishlist.hoverProduct();

    //Add Product to wishlist
    // const productname = 'iPod Nano';
    await wishlist.addOnWishlist();

    // Check wishlist update
    await wishlist.checkWishlistByHeader();

    // Verify Wishlist page element
    await wishlist.verifyWishlistPage();

    // Count the number of items in the wishlist
    await wishlist.countWishlistItems();


  });

  test('Verify that the user can navigate to the product details page from the wishlist page ', async () => {

    // Click on a tab
    await login.ClickonMytab();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // Check wishlist update
    await wishlist.checkWishlistByHeader();

    // Verify Wishlist page element
    await wishlist.verifyWishlistPage();

    // Navigate to Product details page
    const productname = 'iPod Shuffle';
    await wishlist.goToProductDetails(productname);

  });


  test('Verify that  user can navigate to the wishlist page from the product page ', async () => {

    // Click on a tab
    await login.ClickonMytab();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // Navigate to Product page
    await wishlist.checkMegaMenu();

    // Hover on the product
    await wishlist.hoverProduct();

    //Add Product to wishlist
    await wishlist.addOnWishlist();

    // Navigate to Wishlist page from product page 
    await wishlist.goToWishlistByPopup();

    // Verify Wishlist page element
    await wishlist.verifyWishlistPage();


  });

  test('Verify user cannot add the product to the wishlist without logging in ', async () => {

    // Navigate to Product page
    await wishlist.checkMegaMenu();

    // Hover on the product
    await wishlist.hoverProduct();

    //Add Product to wishlist
    await wishlist.addOnWishlist();

    // Verify Login or registration popup displayed
    await wishlist.checkLoginOrRegistration();
    

  });


  test('Verify duplicate products in wishlist are not allowed', async () => {

    // Navigate to Product page
    await wishlist.checkMegaMenu();

    // Hover on the product
    await wishlist.hoverProduct();

    //Add Product to wishlist
    await wishlist.addOnWishlist();

    // Verify Login or registration popup displayed
    await wishlist.checkLoginOrRegistration();
    

  });

  test('Verify that the count update when new product add and remove from the wishlist', async () => {

    // Click on a tab
    await login.ClickonMytab();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // Navigate to Product page
    await wishlist.checkMegaMenu();

    // Hover on the product
    await wishlist.hoverProduct();

    //Add Product to wishlist
    await wishlist.addOnWishlist();

    // Check wishlist update
    await wishlist.checkWishlistByHeader();

    // Verify Wishlist page element
    await wishlist.verifyWishlistPage();

    // Count the number of items in the wishlist
    await wishlist.countWishlistItems();

    // remove the product from wishlist
    await wishlist.removeProduct();

    // Count the number of items in the wishlist
    await wishlist.countWishlistItems();
 

  });


  test('Verify that user can add the product to cart from the wishlist page', async () => {

    // Click on a tab
    await login.ClickonMytab();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // user navigate to wishlist page from header
    await wishlist.checkWishlistByHeader();

    // Verify Wishlist page element
    await wishlist.verifyWishlistPage();

    // remove the product from wishlist
    const productname = 'Product 5';
    await wishlist.addToCartProduct(productname);

    
  });

  test('Verify that the user can navigate to the account page from wishlist page', async () => {

    // Click on a tab
    await login.ClickonMytab();

    // // Destructure formData
    const { email, password } = Loginsingleuser.loginS;
      
    // Fill Login form 
    await login.enterlogincredential(email, password);
    console.log("User Credential Entered Successfully.........");

    // Click on the Login button
    await login.clickonloginbutton();
    console.log('User successfully Logged in to the Account......');

    // user navigate to wishlist page from header
    await wishlist.checkWishlistByHeader();

    // Verify Wishlist page element
    await wishlist.verifyWishlistPage();

    // user navigate to the MY Account page from wishlist
    await wishlist.goToMyAccount();

    
  });



  


});










