// wishlist.ts

import { Locator, Page } from 'playwright';

class Wishlist {
    private page: Page;
    private megaMenuLocator: Locator;
    private appleLinkLocator: Locator;
    private applePageURL: string;
    private wishlistLabelLocator: Locator;
    private wishlistHeadingLocator: Locator;
    private continueLinkLocator: Locator;
    private accountHeadingLocator: Locator;
    private accountOrdersHeadingLocator: Locator;
    private affiliateAccountHeadingLocator: Locator;
    private productImageLocator: Locator;
    private addToWishlistButtonLocator: Locator;
    private removeProductButtonLocator: Locator;
    private successMessageLocator: Locator;
    private addToCartButtonLocator: Locator;
    private wishlistLinkPopupLocator: Locator;
    private wishlistItemsTableLocator: Locator;
    private productDetailsLocator: Locator;
    private loginOrRegistrationTextLocator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.megaMenuLocator = page.locator('//span[contains(text(), "Mega Menu")]');
        this.appleLinkLocator = page.getByRole('link', { name: 'Apple', exact: true });
        this.applePageURL = 'https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8';
        this.wishlistLabelLocator = page.getByLabel('Wishlist');
        this.wishlistHeadingLocator = page.getByRole('heading', { name: 'My Wish List' })
        this.continueLinkLocator = page.getByRole('link', { name: 'Continue' });
        this.accountHeadingLocator = page.getByRole('heading', { name: 'My Account' });
        this.accountOrdersHeadingLocator = page.getByRole('heading', { name: 'My Orders' });
        this.affiliateAccountHeadingLocator = page.getByRole('heading', { name: 'My Affiliate Account' });
        this.productImageLocator = page.locator('//*[@id="mz-product-grid-image-32-212439"]/div/div[1]/img');
        this.addToWishlistButtonLocator = page.locator('.product-action > button:nth-child(2)').first();
        this.removeProductButtonLocator = page.getByRole('link', { name: '' }).first();
        this.successMessageLocator = page.getByText('Success: You have modified');
        this.addToCartButtonLocator = page.getByText('Success: You have added iPod Touch to your shopping cart! View Cart Checkout');
        this.wishlistLinkPopupLocator = page.getByRole('link', { name: 'Wish List (1)' });
        this.wishlistItemsTableLocator = page.locator('.table-responsive tbody tr');
        this.productDetailsLocator = page.locator('#content');
        this.loginOrRegistrationTextLocator = page.getByText('You must login or create an account to save iPod Touch to your wish list! Login');
        // this.addToWishlistButtonLocator = page.locator('.product-thumb .button-group button[data-original-title="Add to Wish List"]').first();
        this.wishlistItemsTableLocator = page.locator('.table-responsive tbody tr');
        this.addToWishlistButtonLocator = page.locator('.product-thumb .button-group button[data-original-title="Add to Wish List"]');
        this.wishlistItemsTableLocator = page.locator('.table-responsive tbody tr');


       
    }

    async checkWishlistByHeader() {
        await this.wishlistLabelLocator.waitFor({ state: 'visible' });
        await this.wishlistLabelLocator.click();
    }

    async verifyWishlistPage() {
        await this.page.getByText('Account My Wish List').click();
        await this.wishlistHeadingLocator.waitFor({ state: 'visible' });
        console.log('User successfully navigated to the Wishlist page from the header navigation');
    }

    async goToMyAccount() {
        await this.continueLinkLocator.waitFor({ state: 'visible' });
        await this.continueLinkLocator.click();
        await this.page.locator('ol').waitFor({ state: 'visible' });
        await this.accountHeadingLocator.waitFor({ state: 'visible' });
        console.log('User successfully navigated to the My Account page from Wishlist page');
    }

    async checkMegaMenu() {
        await this.megaMenuLocator.hover();
        await this.appleLinkLocator.click();
        await this.page.waitForURL(this.applePageURL);
        console.log('User Successfully Navigated to the Apple Page through Mega Menu...');
    }

    async hoverProduct() {
        await this.productImageLocator.waitFor({ state: 'visible' });
        await this.productImageLocator.hover();
    }

    async addOnWishlist() {

        await this.page.locator('.product-action > button:nth-child(2)').first().isVisible();
        await this.page.locator('.product-action > button:nth-child(2)').first().click();
        await this.page.getByText('Success: You have added iPod Touch to your wish list! Wish List (1)').isVisible();

        console.log('User successfully Added product to wishlist.....');
    }

    async removeProduct() {
        await this.removeProductButtonLocator.waitFor({ state: 'visible' });
        await this.removeProductButtonLocator.click();
        await this.successMessageLocator.waitFor({ state: 'visible' });
        console.log('User Successfully removed the product from the Wishlist....');
    }

    async addToCartProduct(productName: string) {
        const productRowLocator = this.page.getByRole('row', { name: productName });
        await productRowLocator.getByRole('button').waitFor({ state: 'visible' });
        await productRowLocator.getByRole('button').click();
        await this.addToCartButtonLocator.waitFor({ state: 'visible' });
        console.log('Success: You have added the product to the shopping cart.....');
    }

    async goToWishlistByPopup() {
        await this.wishlistLinkPopupLocator.waitFor({ state: 'visible' });
        await this.wishlistLinkPopupLocator.click();
    }

    async countWishlistItems(): Promise<number> {
        // Wait for the wishlist page to load
        await this.page.waitForSelector('.table-responsive tbody tr');
        // Get the number of items in the wishlist
        const wishlistItemsCount = await this.page.$$eval('.table-responsive tbody tr', items => items.length);
        console.log(`Number of items in the wishlist: ${wishlistItemsCount}`);
        return wishlistItemsCount;
    }

    async goToProductDetails(productName: string) {
        await this.productDetailsLocator.getByText(productName).waitFor({ state: 'visible' });
        await this.productDetailsLocator.getByText(productName).click();
    }

    async checkLoginOrRegistration() {
        await this.loginOrRegistrationTextLocator.waitFor({ state: 'visible' });
    }

}

export default Wishlist;
