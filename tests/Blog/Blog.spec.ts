import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';
import Apple_func from '../../.github/Pages/MegaMenu/Apple_functional';
import Filters from '../../.github/Pages/Common_Module/Filters';
import Blog from '../../.github/Pages/Blog/blog'



test.describe('Verify Blog Page Functionality And UI Elements', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let apple_func: Apple_func;
  let filters: Filters;
  let blog: Blog;

  

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    apple_func = new Apple_func(page);
    filters = new Filters(page);
    blog = new Blog(page);

    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Verify Blog Page Loads Successfully', async () => {

    await blog.verifyBlogPage();
 
  });

  test('Verify that the "Blog - Poco theme" Name is displayed on the page title', async () => {

    await blog.verifyBlogPage();
    await filters.verifyPageTitle();
  });

  test('Verify that the Presence of Products on the Blog page', async () => {

    await blog.verifyBlogPage();
    await filters.verifyProductCount();
    await apple_func.verifyAppleProducts();
  });

  test('Verify that the Presence of Blog Articles on the Blog page', async () => {

    await blog.verifyBlogPage();
    await blog.verifyBlogs();
    
  });

  test('Verify that the Blog Article titles are displayed correctly', async () => {

    await blog.verifyBlogPage();
    await blog.verifyBlogTitle();
    
  });

  test('Verify that the user is redirected to the blog details page by clicking on the Blog Article', async () => {

    await blog.verifyBlogPage();
    const blogTitle = 'amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus';
    await blog.navigateToBlogDetails(blogTitle);
    
    
  });

  test('Verify the Blog Article Dates is displayed on the Article', async () => {

    await blog.verifyBlogPage();
    const blogTitle = 'amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus';
    await blog.verifyBlogDate(blogTitle);
    
    
  });

  test('Verify that the latest articles next button blog is working  correctly', async () => {

    await blog.verifyBlogPage();
    await blog.latestArticlesNextPage();
    await blog.latestArticlesNextPage();
    await blog.latestArticlesPreviousPage();
    await blog.latestArticlesPreviousPage();
    
  });

  test('Verify that the Most Viewed Articles next button and Previous button are working correctly', async () => {

    await blog.verifyBlogPage();
    await blog.mostViewNextPage();
    await blog.mostViewNextPage();
    await blog.mostViewPreviousPage();
    await blog.mostViewPreviousPage();
    
  });


  test('Verify that the Blog Category Functionality by Business is working correctly', async () => {

    await blog.verifyBlogPage();
    await blog.verifyBusinessBlogs();
    
  });

  test('Verify that the Blog Category Functionality by Electronics is working correctly', async () => {

    await blog.verifyBlogPage();
    await blog.verifyElectronicsBlogs();
    
  });

  test('Verify that the Blog Category Functionality by Technoloy is working correctly', async () => {

    await blog.verifyBlogPage();
    await blog.verifyTechnologyBlogs();
    
  });

  test('Verify that the Blog Category Functionality by Fashion is working correctly', async () => {

    await blog.verifyBlogPage();
    await blog.verifyFashionBlogs();
    
  });
  
  test('Verify that the Blog Page Header section is aligned', async () => {

    await blog.verifyBlogPage();
    await blog.verifyHeader();
    
  });

  test('Verify that the Author Name display on every Article', async () => {

    await blog.verifyBlogPage();
    const articlename = 'amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus'; 
    await blog.verifyAuthorName(articlename);
    
  });

  test('Verify that the Comments display on every Article', async () => {

    await blog.verifyBlogPage();
    const articlename = 'amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus'; 
    await blog.verifyComment(articlename);
    
  });

  test('Verify that the Eye Icon display on every Article', async () => {

    await blog.verifyBlogPage();
    const articlename = 'amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus'; 
    await blog.verifyViewed(articlename);
    
  });
  

});
