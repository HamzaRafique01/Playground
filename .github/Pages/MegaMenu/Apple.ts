import { Locator, Page } from 'playwright';
import { test, expect } from '@playwright/test';
import { Console } from 'console';




class Apple_Page {
   

    private page: Page;
    Continue: any;


    constructor(page: Page) {
        this.page = page;

    }

    async Clickonapplepage() {

        this.page.locator('//span[contains(text(), "Mega Menu")]').hover();
        
        const apple = this.page.getByRole('link', { name: 'Apple', exact: true });

        await apple.click();

        await expect(this.page.getByText('Brand Apple')).toBeVisible();

        console.log('User Successfully Navigate to the Apple Page.....');
    
    }

    async logout(){
        
        await this.page.getByRole('link', { name: 'Logout' }).click();
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/logout');

        await this.page.getByRole('heading', { name: 'Account Logout' }).isVisible();

        await this.page.getByText('You have been logged off your').isVisible();

        await this.page.getByText('Your shopping cart has been').isVisible();

        console.log('User Successfully Logged Out');

        await this.page.getByRole('link', { name: 'Continue' }).click();

        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');

        console.log('User Successfully Redirected to the Home page........');
        
    }

    async verifyApplepageURL(){

       await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8');

       console.log('Apple Page URL successfully verified......');

    }

    async verifypagename(pagename: any){

        await expect(this.page.getByRole('heading', { name: 'Apple', exact: true })).toBeVisible();

        pagename = await this.page.getByRole('heading', { name: 'Apple', exact: true }).textContent();

        console.log('Current Page Verified and the Page name is......'+ pagename);


    }

    async verifypagetitle(){

        const title = await this.page.title();
        console.log('Page title is:.......'+title);
        if (title.includes('Apple')) {
            console.log('Navigated to Apple page successfully.');
        } else {
            console.log('Failed to navigate to Apple page.');
        }

    }

    async verifyimage(){

        await expect(this.page.getByTitle('Apple Cinema 30"')).toBeVisible();
        console.log('Apple Page Promotional image found....');

    }

    async verifyappleproducts(){

    // Extract product information
    const products: string[] = await this.page.$$eval('.product-thumb .caption a', elements => {
        return elements.map(el => (el as HTMLElement).innerText);
    });
    
    // Print the product names
    console.log('Apple Products:');
    products.forEach(product => console.log(product));

    }

    async verifyproductcount(){

        async function countProductsOnPage(page: Page): Promise<number> {
            return await page.$$eval('.product-thumb', products => products.length);
        }

        const productCount = await countProductsOnPage(this.page);
        console.log(`Number of Apple products on the page: ${productCount}`);   

    }


    async setminvalue(min){

        await this.page.locator('#mz-filter-panel-0-0').getByPlaceholder('Minimum Price').click();
        await this.page.locator('#mz-filter-panel-0-0').getByPlaceholder('Minimum Price').fill(min);
        await this.page.locator('#mz-filter-panel-0-0').getByPlaceholder('Minimum Price').press('Enter');

    }

    async setmaxvalue(max){

        await this.page.locator('#mz-filter-panel-0-0').getByPlaceholder('Maximum Price').click();
        await this.page.locator('#mz-filter-panel-0-0').getByPlaceholder('Maximum Price').fill(max);

        await this.page.locator('#mz-filter-panel-0-0').getByPlaceholder('Maximum Price').press('Enter');


    }

    async checkproductdetails(){
        
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

            // Verify product price
            const price = product.locator('.price');
            await expect(price).toBeVisible();
            const priceText = await price.textContent();
            
            expect(priceText).toMatch('$');
        }
        
    }

    async checkimage(){

        const products = this.page.locator('.product-layout');

        const productCount = await products.count();
        expect(productCount).toBeGreaterThan(0);

        
        for (let i = 0; i < productCount; i++) {
            const product = products.nth(i);

            // Verify product image
            const image = product.locator('img');
            await expect(image).toBeVisible();
            const imageSrc = await image.getAttribute('src');
            expect(imageSrc).not.toBeNull();
            expect(imageSrc).toMatch(/\.webp$/); 
        }
    }

 
    async checkthetitledescription(){

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

    async showupproducts(sortby){

        const sortByDropdown = this.page.locator('//select[@id="input-sort-212434"]');
        await expect(sortByDropdown).toBeVisible();

        await sortByDropdown.selectOption({ label: sortby });
        await this.page.waitForTimeout(2000); 

    }

    async Sortbyproduct(count){

        const sortByDropdown = this.page.locator('//select[@id="input-limit-212433"]');
        await expect(sortByDropdown).toBeVisible();

        await sortByDropdown.selectOption({ label: count });
        await this.page.waitForTimeout(2000); 

    }

    async checkaddtocartbutton(){

       await this.page.locator('//div[@class="carousel-item active"]/img[@src="https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/5-270x338.webp"]').hover();

        await this.page.locator('.product-action > button').first().click();

        console.log('Add to Cart Popup displayed on the page....');

        await this.page.getByRole('link', { name: 'View Cart ' }).click();

        console.log('User navigate to the Add to Cart page Successfully by clicking on the Checkout button on the popup banner....');

    }


    async checksearchfilter(search){

        await this.page.locator('#mz-filter-panel-0-1').getByPlaceholder('Search').click();
        console.log('Search filter found.......');

        await this.page.locator('#mz-filter-panel-0-1').getByPlaceholder('Search').fill(search);
        console.log('Data entered in search bar');

        // press enter and wait for records update
        await this.page.locator('#mz-filter-panel-0-1').getByPlaceholder('Search').press('Enter');
        await this.page.waitForTimeout(2000); 


    }

} export default Apple_Page;