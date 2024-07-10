import { Locator, Page } from 'playwright';
import { test, expect } from '@playwright/test';

class Desktop {
    private page: Page;
    private megaMenuLocator: Locator;
    private desktopLinkLocator: Locator;
    private desktopPageURL: string;
    private productTitle: string;
    private desktopHeadingLocator: Locator;
    private imageTitleLocator: Locator;
    private searchInputLocator: Locator;
    private showupDropdownLocator: Locator;
    private sortbyFilterLocator: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.megaMenuLocator = page.locator('//span[contains(text(), "Mega Menu")]');
        this.desktopLinkLocator = page.getByRole('link', { name: 'Desktop', exact: true });
        this.desktopPageURL = 'https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=20';
        this.productTitle = 'Desktop';
        this.desktopHeadingLocator = page.getByRole('heading', { name: 'Desktops' });
        this.imageTitleLocator = page.getByTitle('Apple Cinema 30"');
        this.searchInputLocator = page.locator('#mz-filter-panel-0-1').getByPlaceholder('Search');
        this.showupDropdownLocator = page.locator('//select[@id="input-limit-212402"]');
        this.sortbyFilterLocator = page.locator('//select[@id="input-sort-212403"]');
      

    }

    async navigateToDesktop(){

        await this.megaMenuLocator.hover();
        await this.desktopLinkLocator.click();
        await expect(this.page).toHaveURL(this.desktopPageURL);
        console.log('User Successfully Navigated to the Desktop Page through Mega Menu...');
    }

    async verifyPageTitle() {
        const title = await this.page.title();
        console.log(`Page title is: ${title}`);
        if (title.includes(this.productTitle)) {
            console.log('Navigated to '+title+' page successfully.');
        } else {
            console.log('Failed to navigate to '+title+' page.');
        }
    }

    async verifyPageName() {
        await expect(this.desktopHeadingLocator).toBeVisible();
        const pagename = await this.desktopHeadingLocator.textContent();
        console.log(`Current Page Verified and the Page name is: ${pagename}`);
    }

    async verifyimage() {
        await expect(this.imageTitleLocator).toBeVisible();
        console.log('Desktop Page Promotional image found....');
    }

    async verifyDesktopProducts() {
        await this.page.waitForLoadState();
        const products: string[] = await this.page.$$eval('.product-thumb .caption a', elements => elements.map(el => (el as HTMLElement).innerText));
        console.log('Desktop Products:');
        products.forEach(product => console.log(product));
    }

    async verifyProductCount() {
        await this.page.waitForLoadState();
        const productCount = await this.page.$$eval('.product-thumb', products => products.length);
        console.log(`Number of Desktop products on the page: ${productCount}`);
    }
    
    async checksearchfilter(search: string) {
        await this.searchInputLocator.click();
        console.log('Search filter found.......')
        await this.searchInputLocator.fill(search);
        console.log('Data entered in search bar');
        await this.searchInputLocator.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async checkFilterList(){

        await expect(this.page.getByText('Filter Price to Manufacturer Apple 42 Canon 10 Hewlett-Packard 10 HTC 8 Nikon 2 Palm 2 Sony 1 See more Sub category Mac 75 PC 75 Search Color Availability In stock 64 Out Of Stock 7 2-3 Days 2 Pre-Order 2 Size L M S XL XXL Discount 10% off or more 0 20% off or more 0 30% off or more 0 40% off or more 0 50% off or more 0 Rating & up 0 & up 0 & up 0 & up')).toBeVisible();
        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();

    }

    async checkLogo(){
        
        await expect(this.page.getByRole('link', { name: 'Poco Electro' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Poco Electro' }).click();

        console.log('User successfully Navigate to the Home Page By Clicking on the Logo Icon');

    }

    async verifyDesktopcategories(){

        await expect(this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' })).toBeVisible();
        await this.page.locator('#mz-filter-0 div').filter({ hasText: 'Filter' }).click();
        await expect(this.page.getByText('Desktops (75)')).toBeVisible();
        await expect(this.page.getByRole('link', { name: '- PC (75)' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: '- Mac (75)' })).toBeVisible();

        console.log('Desktop Product Categories and Desktop Sub Categories are found on the Page');

    }

    async showUpProduct(count: string) {
        await this.page.waitForLoadState();
        await expect(this.showupDropdownLocator).toBeVisible();
        await this.showupDropdownLocator.selectOption({ label: count });
        console.log('Products show filter applied.....');
        console.log("Desired Show Selected........."+ count);
    }

    async sortByProducts(sortBy: string) {
        await expect(this.sortbyFilterLocator).toBeVisible();
        await this.sortbyFilterLocator.selectOption({ label: sortBy });
        console.log('Products sorted by filter applied.');
        await this.page.waitForLoadState();
        console.log("Desired SortBy Selected........."+ sortBy);
        
    }

    async verifyHeaderSearch(search){
        await this.page.getByRole('textbox', { name: 'Search For Products' }).click();
        await this.page.getByRole('textbox', { name: 'Search For Products' }).fill(search);
        await this.page.getByRole('textbox', { name: 'Search For Products' }).press('Enter');
    }


}

export default Desktop;
