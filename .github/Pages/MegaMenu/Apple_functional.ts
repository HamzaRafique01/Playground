import { Locator, Page } from 'playwright';
import { test, expect } from '@playwright/test';
import { Console } from 'console';

class Apple_func {
    private page: Page;
    private megaMenuLocator: Locator;
    private appleLinkLocator: Locator;
    private appleHeadingLocator: Locator;
    private productNamesLocator: Locator;
    private addToCartButtonLocator: Locator;
    private viewCartLinkLocator: Locator;
    private applePageURL: string;
    private appleHeadingText: string;
    private productTitle: string;
    private productImageSrc: string;

    constructor(page: Page) {
        this.page = page;
        this.megaMenuLocator = page.locator('//span[contains(text(), "Mega Menu")]');
        this.appleLinkLocator = page.getByRole('link', { name: 'Apple', exact: true });
        this.appleHeadingLocator = page.getByRole('heading', { name: 'Apple', exact: true });
        this.productNamesLocator = page.locator('.product-thumb .caption a');
        this.addToCartButtonLocator = page.locator('.product-action > button').first();
        this.viewCartLinkLocator = page.getByRole('link', { name: 'View Cart ' });
        this.applePageURL = 'https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8';
        this.appleHeadingText = 'Apple';
        this.productTitle = 'Apple';
        this.productImageSrc = 'https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/5-270x338.webp';
    }

    async checkMegaMenu() {
        await this.megaMenuLocator.hover();
        await this.appleLinkLocator.click();
        await expect(this.page).toHaveURL(this.applePageURL);
        console.log('User Successfully Navigated to the Apple Page through Mega Menu...');
    }

    async verifyPageName() {
        await expect(this.appleHeadingLocator).toBeVisible();
        const pagename = await this.appleHeadingLocator.textContent();
        console.log(`Current Page Verified and the Page name is: ${pagename}`);
    }

    async verifyPageTitle() {
        const title = await this.page.title();
        console.log(`Page title is: ${title}`);
        if (title.includes(this.productTitle)) {
            console.log('Navigated to Apple page successfully.');
        } else {
            console.log('Failed to navigate to Apple page.');
        }
    }

    async verifyAppleProducts() {
        const products: string[] = await this.page.$$eval('.product-thumb .caption a', elements => {
            return elements.map(el => (el as HTMLElement).innerText);
        });
        console.log('Apple Products:');
        products.forEach(product => console.log(`Name of Apple Product: ${product}`));
    }

    async checkAddToCartButton() {
        await this.page.locator(`//div[@class="carousel-item active"]/img[@src="${this.productImageSrc}"]`).hover();
        await this.addToCartButtonLocator.click();
        console.log('Add to Cart Popup displayed on the page....');
        await this.viewCartLinkLocator.click();
        console.log('User navigated to the Add to Cart page successfully by clicking on the Checkout button on the popup banner....');
    }


}

export default Apple_func;
