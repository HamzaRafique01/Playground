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
    private discountFilterLocator: Locator;
    private priceLocator: Locator;

    constructor(page: Page) {
        this.page = page;
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
        this.colorFilterLocator = page.locator('#mz-filter-panel-0-2').getByRole('img', { name: '' });
        this.availabilityFilterLocator = page.locator('#mz-filter-panel-0-3').getByText('');
        this.sizeFilterLocator = page.locator('#mz-filter-panel-0-4').getByText('');
        this.discountFilterLocator = page.locator('#mz-filter-panel-0-5 div').filter({ hasText: '30% off or more' }).nth(2);
        this.priceLocator = page.getByText('Price');
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
        const products: string[] = await this.page.$$eval('.product-thumb .caption a', elements => {
            return elements.map(el => (el as HTMLElement).innerText);
        });
        console.log('Products:');
        products.forEach(product => console.log(product));
    }

    async verifyProductCount() {
        const productCount = await this.page.$$eval('.product-thumb', products => products.length);
        console.log(`Number of products on the page: ${productCount}`);
    }

    async setMinValue(min: string) {
        await expect(this.priceLocator).toBeVisible();
        await this.minimumPriceLocator.fill(min);
        await this.minimumPriceLocator.press('Enter');
        console.log('Minimum price selected. Waiting for page update...');
    }

    async setMaxValue(max: string) {
        await expect(this.priceLocator).toBeVisible();
        await this.maximumPriceLocator.fill(max);
        await this.maximumPriceLocator.press('Enter');
        console.log('Maximum price selected. Waiting for page update...');
    }

    async sortByProducts(sortBy: string) {
        await expect(this.sortbyFilterLocator).toBeVisible();
        await this.sortbyFilterLocator.selectOption({ label: sortBy });
        console.log('Products sorted by filter applied.');
    }

    async showUpProduct(count: string) {
        await expect(this.showupDropdownLocator).toBeVisible();
        await this.showupDropdownLocator.selectOption({ label: count });
        console.log('Products show up filter applied.');
    }

    async checkAddToCartButton() {
        await this.productImageLocator.hover();
        await this.addToCartButtonLocator.click();
        console.log('Add to cart popup displayed on the page.');
        await this.viewCartLinkLocator.click();
        console.log('User navigated to the add to cart page successfully.');
    }

    async checkSearchFilter(search: string) {
        await this.searchFilterLocator.isVisible();
        console.log('Search filter found.');
        await this.searchFilterLocator.fill(search);
        console.log('Data entered in search bar.');
        await this.searchFilterLocator.press('Enter');
    }

    async checkProductColor(color: string) {
        await this.page.locator('#mz-filter-content-0').getByText('Color').click();
        await this.colorFilterLocator.getByRole('img', { name: color }).click();
        console.log('Product color selected successfully.');
    }

    async checkProductAvailability(availability: string) {
        await this.page.locator('#mz-filter-content-0').getByText('Availability').click();
        await this.availabilityFilterLocator.getByText(availability).click();
        console.log('Product availability selected successfully.');
    }

    async checkSizeOfProduct(size: string) {
        await this.page.locator('#mz-filter-content-0').getByText('Size').click();
        await this.sizeFilterLocator.getByText(size).click();
        console.log('Product size selected successfully.');
    }

    async checkDiscounts() {
        await this.page.locator('#mz-filter-content-0').getByText('Discount').click();
        await this.discountFilterLocator.click();
        console.log('Product discount selected successfully.');
    }

    async checkNextPage() {
        const paginationContainer = await this.page.locator('.pagination');
        await expect(paginationContainer).toBeVisible();
        await expect(this.page.getByRole('link', { name: '>', exact: true })).toBeVisible();
        await this.page.getByRole('link', { name: '>', exact: true }).click();
        await this.page.waitForNavigation();
        await expect(this.page.url()).toMatch(/page=\d+/);
    }

    async checkPreviousPage() {
        const paginationContainer = await this.page.locator('.pagination');
        await expect(paginationContainer).toBeVisible();
        await expect(this.page.getByRole('link', { name: '<', exact: true })).toBeVisible();
        await this.page.getByRole('link', { name: '<', exact: true }).click();
        await this.page.waitForNavigation();
        await expect(this.page.url()).toMatch(/page=\d+/);
    }

    async checkCustomPage(num: string) {
        const paginationContainer = await this.page.locator('.pagination');
        await expect(paginationContainer).toBeVisible();
        await expect(this.page.getByRole('link', { name: num, exact: true })).toBeVisible();
        await this.page.getByRole('link', { name: num, exact: true }).click();
        await this.page.waitForNavigation();
        await expect(this.page.url()).toMatch(/page=\d+/);
    }
}

export default Filters;
