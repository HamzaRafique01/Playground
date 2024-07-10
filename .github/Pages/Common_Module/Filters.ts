import { Locator, Page } from 'playwright';
import { test, expect } from '@playwright/test';

class Filters {
    private page: Page;
    private megaMenuLocator: Locator;
    private currentpageLocator: Locator;
    private brandLocator: Locator;
    private headingLocator: Locator;
    private productThumbLocator: Locator;
    private minimumPriceLocator: Locator;
    private maximumPriceLocator: Locator;
    private sortbyFilterLocator: Locator;
    private showupDropdownLocator: Locator;
    private productImageLocator: Locator;
    private addToCartButtonLocator: Locator;
    private viewCartLinkLocator: Locator;
    private searchFilterLocator: Locator;
    private colorFilterLocator: Locator;
    private availabilityFilterLocator: Locator;
    private sizeFilterLocator: Locator;
    private manufacturerFilterLocator: Locator;
    private discountFilterLocator: Locator;
    private showmore: Locator;
    private listview: Locator;
    private gridview: Locator;
    private productComparisonLinkLocator: Locator;







    constructor(page: Page) {
        this.page = page;
        this.showmore = page.locator('#mz-filter-panel-0-1').getByRole('link', { name: 'See more' });
        this.megaMenuLocator = page.locator('//span[contains(text(), "Mega Menu")]');
        this.currentpageLocator = page.getByRole('link', { name: '', exact: true });
        this.brandLocator = page.locator('li').filter({ hasText: 'Brand' });
        this.headingLocator = page.getByRole('heading', { name: '', exact: true });
        this.productThumbLocator = page.locator('.product-thumb .caption a');
        this.minimumPriceLocator = page.locator('#mz-filter-panel-0-0').getByPlaceholder('Minimum Price');
        this.maximumPriceLocator = page.locator('#mz-filter-panel-0-0').getByPlaceholder('Maximum Price');
        this.sortbyFilterLocator = page.locator('//select[@id="input-sort-212434"]');
        this.showupDropdownLocator = page.locator('//select[@id="input-limit-212433"]');
        this.productImageLocator = page.locator('//div[@class="carousel-item active"]/img[@src="https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/5-270x338.webp"]');
        this.addToCartButtonLocator = page.locator('.product-action > button').first();
        this.viewCartLinkLocator = page.getByRole('link', { name: 'View Cart' });
        this.searchFilterLocator = page.locator('#mz-filter-panel-0-1').getByPlaceholder('Search');
        this.colorFilterLocator = page.locator('#mz-filter-panel-0-2').getByRole('img', { name: 'Green' });
        this.availabilityFilterLocator = page.locator('#mz-filter-panel-0-3').getByText('');
        this.sizeFilterLocator = page.locator('#mz-filter-panel-0-4').getByText('');
        this.discountFilterLocator = page.locator('#mz-filter-panel-0-5 div').filter({ hasText: '' }).nth(2);
        this.manufacturerFilterLocator = page.locator('#mz-filter-panel-0-1').getByText('');
        this.listview = page.locator('//button[@data-original-title="List"]');
        this.gridview = page.locator('//button[@data-original-title="Grid"]');
        this.productComparisonLinkLocator = this.page.locator('//a[contains(@href, "compare")]');
    }

    async clickOnPage(pageName: string) {
        await this.megaMenuLocator.hover();
        const pageLink = this.page.getByRole('link', { name: pageName, exact: true });
        await pageLink.click();
        await this.brandLocator.click();
        console.log(`User successfully navigated to the ${pageName} page.`);
    }

    async verifyPageName(pageName: string) {
        await expect(this.page.getByRole('heading', { name: pageName, exact: true })).toBeVisible();
        const currentPage = await this.page.getByRole('heading', { name: pageName, exact: true }).textContent();
        console.log(`Current page verified and the page name is ${currentPage}`);
        
    }

    async verifyPageTitle() {
        const title = await this.page.title();
        console.log(`Page title is: ${title}`);
        if (title.includes(title)) {
            console.log(`Navigated to page ${title} successfully.`);
        } else {
            console.log(`Failed to navigate to page ${title}.`);
        }
    }

    async verifyProductsOnPage() {
        await this.page.waitForLoadState();
        const products: string[] = await this.page.$$eval('.product-thumb .caption a', elements => {
            return elements.map(el => (el as HTMLElement).innerText);
        });
        console.log('Products:');
        products.forEach(product => console.log(product));
        
    }

    async verifyProductCount() {
        await this.page.waitForLoadState();
        const productCount = await this.page.$$eval('.product-thumb', products => products.length);
        console.log(`Number of products on the page: ${productCount}`);
    }

    async setMinValue(min: string) {
        await expect(this.minimumPriceLocator).toBeVisible();
        await this.minimumPriceLocator.fill(min);
        await this.minimumPriceLocator.press('Enter');
        console.log('Minimum price selected. Waiting for page update.....'+ min);
        await  this.page.waitForLoadState();
    }

    async setMaxValue(max: string) {
        await expect(this.maximumPriceLocator).toBeVisible();
        await this.maximumPriceLocator.fill(max);
        await this.maximumPriceLocator.press('Enter');
        console.log('Maximum price selected. Waiting for page update.....'+ max);
        await  this.page.waitForLoadState();
    }

    async sortByProducts(sortBy: string) {
        await expect(this.sortbyFilterLocator).toBeVisible();
        await this.sortbyFilterLocator.selectOption({ label: sortBy });
        console.log('Products sorted by filter applied.');
        console.log("Desired SortBy Selected........."+ sortBy);
        await  this.page.waitForLoadState();
    }

    async showUpProduct(count: string) {
        await expect(this.showupDropdownLocator).toBeVisible();
        await this.showupDropdownLocator.selectOption({ label: count });
        console.log('Products show filter applied.....');
        console.log("Desired Show Selected........."+ count);
        await  this.page.waitForLoadState();
    }

    async checkAddToCartButton() {
        await this.productImageLocator.hover();
        await this.addToCartButtonLocator.click();
        console.log('Add to cart popup displayed on the page.');
        await this.viewCartLinkLocator.click();
        console.log('User navigated to the add to cart page successfully.');
        await  this.page.waitForLoadState();
    }

    async checkSearchFilter(search: string) {
        await this.searchFilterLocator.isVisible();
        console.log('Search filter found.');
        await this.searchFilterLocator.fill(search);
        console.log('Data entered in search bar.');
        await this.searchFilterLocator.press('Enter');
        await  this.page.waitForLoadState();
    }

    async checkProductColor(color: string) {
        await this.page.locator('#mz-filter-content-0').getByText('Color').isVisible();
        await expect(this.page.locator('#mz-filter-panel-0-2').getByRole('img', { name: color })).toBeVisible();
        await this.colorFilterLocator.click();
        console.log('Product color selected successfully.');
        await  this.page.waitForLoadState();
    }

    async checkProductAvailability(availability: string) {
        await this.page.locator('#mz-filter-content-0').getByText('Availability').click();
        await this.availabilityFilterLocator.getByText(availability).click();
        console.log('Product availability selected successfully.....'+availability);
        await  this.page.waitForLoadState();
    }

    async checkSizeOfProduct(size: string) {
        await this.page.locator('#mz-filter-content-0').getByText('Size').click();
        await this.sizeFilterLocator.getByText(size).click();
        console.log('Product size selected successfully......'+size);
        await  this.page.waitForLoadState();
    }

    async checkDiscounts(discount) {
        await this.page.locator('#mz-filter-content-0').getByText(discount).click();
        await this.discountFilterLocator.click();
        console.log('Product discount selected successfully.....'+discount);
        await  this.page.waitForLoadState();
    }

    async checkNextPage() {
        const paginationContainer = await this.page.locator('.pagination');
        await expect(paginationContainer).toBeVisible();
        await expect(this.page.getByRole('link', { name: '>', exact: true })).toBeVisible;
        await this.page.getByRole('link', { name: '>', exact: true }).click();
        await  this.page.waitForLoadState();
    }

    async checkPreviousPage() {
        const paginationContainer = await this.page.locator('.pagination');
        await expect(paginationContainer).toBeVisible();
        await expect(this.page.getByRole('link', { name: '<', exact: true })).toBeVisible();
        await this.page.getByRole('link', { name: '<', exact: true }).click();
        await  this.page.waitForLoadState();
    }

    async checkCustomPage(num: string) {
        const paginationContainer = await this.page.locator('.pagination');
        await expect(paginationContainer).toBeVisible();
        await expect(this.page.getByRole('link', { name: num, exact: true })).toBeVisible();
        await this.page.getByRole('link', { name: num, exact: true }).click();
        await  this.page.waitForLoadState();
    }

    async checkDesktopProducts() {
        
        await expect(this.page.getByRole('link', { name: '- PC (75)' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: '- Mac (75)' })).toBeVisible();

        console.log('User successfully fopund Desktop Sub-categories category page........ ');


    }

    async checkLaptopsProducts() {
        
        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();

        await expect(this.page.getByRole('link', { name: 'Laptops (75)' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Laptops (75)' }).click();

        await expect(this.page.getByRole('heading', { name: 'Laptops' })).toBeVisible();
        await expect(this.page.getByText('Shop Laptop feature only the')).toBeVisible();

        console.log('User successfully navigate to the Laptops category page........ ');

    }

    async checkComponentsProducts() {
        
        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();

        await expect(this.page.getByRole('link', { name: 'Components (75)' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Components (75)' }).click();

        await expect(this.page.getByRole('heading', { name: 'Components' })).toBeVisible();
        await expect(this.page.getByText('Lorem ipsum dolor sit amet,')).toBeVisible();

        console.log('User successfully navigate to the Components category page........ ');

    }

    async checkTabletsProducts() {
        
        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();

        await expect(this.page.getByRole('link', { name: 'Tablets (75)' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Tablets (75)' }).click();

        await expect(this.page.getByRole('heading', { name: 'Tablets' })).toBeVisible();
        await expect(this.page.getByText('Lorem ipsum dolor sit amet,')).toBeVisible();

        console.log('User successfully navigate to the Tablets category page........ ');

    }

    async checkSoftwareProducts() {
        
        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();

        await expect(this.page.getByRole('link', { name: 'Software (75)' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Software (75)' }).click();

        await expect(this.page.getByRole('heading', { name: 'Software' })).toBeVisible();
        await expect(this.page.getByText('Lorem ipsum dolor sit amet,')).toBeVisible();

        console.log('User successfully navigate to the Software category page........ ');

    }

    async checkPhonesPDAsProducts() {
        
        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();

        await expect(this.page.getByRole('link', { name: 'Phones & PDAs (75)' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Phones & PDAs (75)' }).click();

        await expect(this.page.getByRole('heading', { name: 'Phones & PDAs' })).toBeVisible();
        await expect(this.page.getByText('Lorem ipsum dolor sit amet,')).toBeVisible();

        console.log('User successfully navigate to the Phones & PDAs category page........ ');

    }

    async checkCamerasProducts() {
        
        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();

        await expect(this.page.getByRole('link', { name: 'Cameras (75)' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Cameras (75)' }).click();

        await expect(this.page.getByRole('heading', { name: 'Cameras' })).toBeVisible();
        await expect(this.page.getByText('Lorem ipsum dolor sit amet,')).toBeVisible();

        console.log('User successfully navigate to the Cameras category page........ ');

    }

    async checkMP3PlayersProducts() {
        
        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();

        await expect(this.page.getByRole('link', { name: 'MP3 Players (75)' })).toBeVisible();
        await this.page.getByRole('link', { name: 'MP3 Players (75)' }).click();

        await expect(this.page.getByRole('heading', { name: 'MP3 Players' })).toBeVisible();
        await expect(this.page.getByText('Lorem ipsum dolor sit amet,')).toBeVisible();

        console.log('User successfully navigate to the MP3 Players category page........ ');

    }
    async checkManufacturerProducts(manufacturer) {
        
        await this.page.locator('#mz-filter-content-0').getByText('Manufacturer');
        await this.showmore.click();

        await this.manufacturerFilterLocator.getByText(manufacturer).click();
        console.log('Product size selected successfully.....'+manufacturer);

    }

    async gridToList(){

        await this.listview.isVisible();
        await this.listview.click();
        console.log('List view button Clicked........');

    }

    async listToGrid(){

        await this.gridview.isVisible();
        await this.gridview.click();
        console.log('Grid view button Clicked.......');
    }

    async hoverProduct() {
        await this.productImageLocator.waitFor({ state: 'visible' });
        await this.productImageLocator.hover();
    }

    async addOncomparelist() {

        await this.page.locator('button:nth-child(4)').first().click();
        await expect(this.page.getByText('Success: You have added iPod Touch to your product comparison! Product Compare')).toBeVisible();

        console.log('User successfully Added product to Comapre.....');
    }

    async addProductToComparison(productName: string) {
        const productLocator = this.page.locator(`//*[@id="entry_212439"]/div/div/div/div/h4/a[contains(text(), '${productName}')]`);
        await expect(productLocator).toBeVisible();
        await productLocator.hover();
        const addtocompare = this.page.locator("//*[contains(text(),'"+productName+"')]/parent::h4/parent::div/parent::div/child::div/div[@class='product-action']/button[@title='Compare this Product']");
        await addtocompare.click();
        console.log(`Product "${productName}" added to comparison list.`);
    }
    
    async navigateToComparisonPage() {
        await expect(this.productComparisonLinkLocator).toBeVisible();
        await this.productComparisonLinkLocator.click();
        await this.page.waitForLoadState('load');
        const comparisonHeading = this.page.locator('//h1[contains(text(), "Product Comparison")]');
        await expect(comparisonHeading).toBeVisible();
        console.log('Navigated to the product comparison page.');
    }

    async verifyProductsInComparison(productNames: string[]) {
        for (const productName of productNames) {
            const productLocator = this.page.locator(`//a[contains(text(), "${productName}")]`);
            await expect(productLocator).toBeVisible();
            console.log(`Product "${productName}" is present in the comparison list.`);
        }
    }


    async verifybreadcrumbpath(path){

        await expect(this.page.getByLabel('breadcrumb').getByText(path)).toBeVisible();
        const extractedPath = await this.page.getByLabel('breadcrumb').getByText(path).textContent();

        console.log('Breadcrumb navigation path is.......'+extractedPath);
    }

}

export default Filters;
