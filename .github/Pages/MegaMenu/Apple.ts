import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';

class Apple_Page {
    private page: Page;
    private megaMenuLocator: Locator;
    private appleLinkLocator: Locator;
    private logoutLinkLocator: Locator;
    private headingLocator: Locator;
    private titleLocator: Locator;
    private imageTitleLocator: Locator;
    private productThumbLocator: Locator;
    private minPriceInputLocator: Locator;
    private maxPriceInputLocator: Locator;
    private sortByDropdownLocator: Locator;
    private showByDropdownLocator: Locator;
    private addToCartButtonLocator: Locator;
    private searchInputLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.megaMenuLocator = page.locator('//span[contains(text(), "Mega Menu")]');
        this.appleLinkLocator = page.getByRole('link', { name: 'Apple', exact: true });
        this.logoutLinkLocator = page.getByRole('link', { name: 'Logout' });
        this.headingLocator = page.getByRole('heading', { name: 'Apple', exact: true });
        this.titleLocator = page.locator('h1');
        this.imageTitleLocator = page.getByTitle('Apple Cinema 30"');
        this.productThumbLocator = page.locator('.product-thumb .caption a');
        this.minPriceInputLocator = page.locator('#mz-filter-panel-0-0').getByPlaceholder('Minimum Price');
        this.maxPriceInputLocator = page.locator('#mz-filter-panel-0-0').getByPlaceholder('Maximum Price');
        this.sortByDropdownLocator = page.locator('//select[@id="input-sort-212434"]');
        this.showByDropdownLocator = page.locator('//select[@id="input-limit-212433"]');
        this.addToCartButtonLocator = page.locator('.product-action > button');
        this.searchInputLocator = page.locator('#mz-filter-panel-0-1').getByPlaceholder('Search');
    }

    async Clickonapplepage() {
        await this.megaMenuLocator.hover();
        await this.appleLinkLocator.click();
        await expect(this.page.waitForURL('https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8'));
        console.log('User Successfully Navigated to the Apple Page.....');
    }

    async logout() {
        await this.logoutLinkLocator.click();
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/logout');
        await this.headingLocator.isVisible();
        await this.page.waitForSelector('You have been logged off your');
        await this.page.waitForSelector('Your shopping cart has been');
        console.log('User Successfully Logged Out');
        await this.page.getByRole('link', { name: 'Continue' }).click();
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
        console.log('User Successfully Redirected to the Home page........');
    }

    async verifyApplepageURL() {
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8');
        console.log('Apple Page URL successfully verified......');
    }

    async verifypagename() {
        await expect(this.headingLocator).toBeVisible();
        const pageTitle = await this.headingLocator.textContent();
        console.log('Current Page Verified and the Page name is......' + pageTitle);
    }

    async verifypagetitle() {
        const title = await this.page.title();
        console.log('Page title is:.......' + title);
        if (title.includes('Apple')) {
            console.log('Navigated to Apple page successfully.');
        } else {
            console.log('Failed to navigate to Apple page.');
        }
    }

    async verifyimage() {
        await expect(this.imageTitleLocator).toBeVisible();
        console.log('Apple Page Promotional image found....');
    }

    async verifyappleproducts() {
        const products: string[] = await this.page.$$eval('.product-thumb .caption a', elements => elements.map(el => (el as HTMLElement).innerText));
        console.log('Apple Products:');
        products.forEach(product => console.log(product));
    }

    async verifyproductcount() {
        const productCount = await this.page.$$eval('.product-thumb', products => products.length);
        console.log(`Number of Apple products on the page: ${productCount}`);
    }

    async setminvalue(min: string) {
        await this.minPriceInputLocator.click();
        await this.minPriceInputLocator.fill(min);
        await this.minPriceInputLocator.press('Enter');
    }

    async setmaxvalue(max: string) {
        await this.maxPriceInputLocator.click();
        await this.maxPriceInputLocator.fill(max);
        await this.maxPriceInputLocator.press('Enter');
    }

    async checkproductdetails() {
        const products = this.page.locator('.product-layout');
        const productCount = await products.count();
        expect(productCount).toBeGreaterThan(0);
        for (let i = 0; i < productCount; i++) {
            const product = products.nth(i);
            const title = product.locator('.caption h4 a');
            await expect(title).toBeVisible();
            const titleText = await title.textContent();
            expect(titleText).not.toBeNull();
            expect(titleText).not.toBe('');
            const price = product.locator('.price');
            await expect(price).toBeVisible();
            const priceText = await price.textContent();
            expect(priceText).toMatch('$');
        }
    }

    async checkimage() {
        const products = this.page.locator('.product-layout');
        const productCount = await products.count();
        expect(productCount).toBeGreaterThan(0);
        for (let i = 0; i < productCount; i++) {
            const product = products.nth(i);
            const image = product.locator('img');
            await expect(image).toBeVisible();
            const imageSrc = await image.getAttribute('src');
            expect(imageSrc).not.toBeNull();
            expect(imageSrc).toMatch(/\.webp$/);
        }
    }

    async checkthetitledescription() {
        const firstProduct = this.page.locator('.product-layout').first();
        const productTitle = await firstProduct.locator('.caption h4 a').textContent();
        expect(productTitle).not.toBeNull();
        await firstProduct.click();
        await expect(this.page).toHaveURL(/.*product/);
        const detailTitle = this.page.locator('h1');
        await expect(detailTitle).toBeVisible();
        const detailTitleText = await detailTitle.textContent();
        expect(detailTitleText).not.toBeNull();
        expect(detailTitleText).toContain(productTitle?.trim());
        const detailImage = this.page.locator('.thumbnails img');
        await expect(detailImage).toBeVisible();
        const detailImageSrc = await detailImage.getAttribute('src');
        expect(detailImageSrc).not.toBeNull();
        expect(detailImageSrc).toMatch(/\.webp$/);
        const detailPrice = this.page.locator('.price');
        await expect(detailPrice).toBeVisible();
        const detailPriceText = await detailPrice.textContent();
        expect(detailPriceText).toMatch('$');
    }

    async showupproducts(sortby: string) {
        await expect(this.sortByDropdownLocator).toBeVisible();
        await this.sortByDropdownLocator.selectOption({ label: sortby });
        await this.page.waitForTimeout(2000);
    }

    async Sortbyproduct(count: string) {
        await expect(this.showByDropdownLocator).toBeVisible();
        await this.showByDropdownLocator.selectOption({ label: count });
        await this.page.waitForTimeout(2000);
    }

    async checkaddtocartbutton() {
        await this.page.locator('//div[@class="carousel-item active"]/img[@src="https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/5-270x338.webp"]').hover();
        await this.addToCartButtonLocator.click();
        console.log('Add to Cart Popup displayed on the page....');
        await this.page.getByRole('link', { name: 'View Cart ' }).click();
        console.log('User navigated to the Add to Cart page Successfully by clicking on the Checkout button on the popup banner....');
    }

    async checksearchfilter(search: string) {
        await this.searchInputLocator.click();
        console.log('Search filter found.......')
        await this.searchInputLocator.fill(search);
        console.log('Data entered in search bar');
        await this.searchInputLocator.press('Enter');
        await this.page.waitForTimeout(2000);
    }
}

export default Apple_Page;
