import { Locator, Page } from 'playwright';
import { test, expect } from '@playwright/test';

class Blog {
    private page: Page;
    private blogTitleSelector: string;
    private blogLinkSelector: string;
    private latestArticlesPaginationSelector: string;
    private mostViewedPaginationSelector: string;
    private businessBlogsLinkSelector: string;
    private electronicsBlogsLinkSelector: string;
    private technologyBlogsLinkSelector: string;
    private fashionBlogsLinkSelector: string;

    constructor(page: Page) {
        this.page = page;
        this.blogTitleSelector = '//h4[@class="title"]/a[contains(text(), "';
        this.blogLinkSelector = '//h4/a[@class="text-ellipsis-2"]';
        this.latestArticlesPaginationSelector = '#mz-article-listing-76210960 div';
        this.mostViewedPaginationSelector = '#mz-article-listing-77210961 div';
        this.businessBlogsLinkSelector = 'Business (16)';
        this.electronicsBlogsLinkSelector = 'Electronics (16)';
        this.technologyBlogsLinkSelector = 'Technology (16)';
        this.fashionBlogsLinkSelector = 'Fashion (16)';
    }

    async verifyBlogPage() {
        await expect(this.page.getByRole('link', { name: 'Blog', exact: true })).toBeVisible();
        await this.page.getByRole('link', { name: 'Blog', exact: true }).click();

        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home');
        await expect(this.page.getByRole('heading', { name: 'Latest Articles' })).toBeVisible();

        console.log('User successfully Navigate to the blog Page');
    }

    async verifyBlogs() {
        await this.page.waitForSelector(this.blogLinkSelector);

        const blogCount = await this.page.$$eval(this.blogLinkSelector, blogs => blogs.length);
        console.log('Number of present blogs on the page...:' + blogCount);

        expect(blogCount).toBeGreaterThan(0);
    }

    async verifyBlogTitle() {
        const blogTitles = await this.page.$$eval(this.blogLinkSelector, blogs =>
            blogs.map(blog => blog.textContent ? blog.textContent.trim() : '')
        );

        blogTitles.forEach((title, index) => {
            console.log(`Blog ${index + 1}: ${title}`);
        });
    }

    async navigateToBlogDetails(blogTitle: string) {
        const blogTitleXPath = `${this.blogTitleSelector}${blogTitle}")]`;
        await this.page.locator(blogTitleXPath).click();
        await this.page.waitForNavigation();
        await expect(this.page.getByText(blogTitle)).toBeVisible();
        await expect(this.page.getByRole('heading', { name: blogTitle })).toBeVisible();

        console.log('User successfully navigate to the Article details page');
    }

    async verifyBlogDate(blogName: string) {
        const dateSelector = `//img[@title="${blogName}"]/parent::a/parent::div/following-sibling::div/div/span[@class="timestamp"]`;
        await this.page.locator(dateSelector).isVisible();
        const dates = await this.page.locator(dateSelector).textContent();
        console.log("The Blog date mentioned on the Article......." + dates);
    }

    async latestArticlesNextPage() {
        const paginationLink = this.page.locator(this.latestArticlesPaginationSelector).filter({ hasText: 'Latest Articles' }).locator('a').first();
        await paginationLink.click();
    }

    async latestArticlesPreviousPage() {
        const paginationLink = this.page.locator(this.latestArticlesPaginationSelector).filter({ hasText: 'Latest Articles' }).locator('a').nth(1);
        await paginationLink.click();
    }

    async mostViewNextPage() {
        const paginationLink = this.page.locator(this.mostViewedPaginationSelector).filter({ hasText: 'Most viewed' }).locator('a').first();
        await paginationLink.click();
    }

    async mostViewPreviousPage() {
        const paginationLink = this.page.locator(this.mostViewedPaginationSelector).filter({ hasText: 'Most viewed' }).locator('a').nth(1);
        await paginationLink.click();
    }

    async verifyBusinessBlogs() {
        await expect(this.page.getByRole('link', { name: this.businessBlogsLinkSelector })).toBeVisible();
        await this.page.getByRole('link', { name: this.businessBlogsLinkSelector }).click();
        await expect(this.page.getByText('Blog Business')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Business' })).toBeVisible();
        console.log('User successfully navigate to the Business blogs Page');
    }

    async verifyElectronicsBlogs() {
        await expect(this.page.getByRole('link', { name: this.electronicsBlogsLinkSelector })).toBeVisible();
        await this.page.getByRole('link', { name: this.electronicsBlogsLinkSelector }).click();
        await expect(this.page.getByText('Blog Electronics')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Electronics' })).toBeVisible();
        console.log('User successfully navigate to the Electronics blogs Page');
    }

    async verifyTechnologyBlogs() {
        await expect(this.page.getByRole('link', { name: this.technologyBlogsLinkSelector })).toBeVisible();
        await this.page.getByRole('link', { name: this.technologyBlogsLinkSelector }).click();
        await expect(this.page.getByText('Blog Technology')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Technology' })).toBeVisible();
        console.log('User successfully navigate to the Technology blogs Page');
    }

    async verifyFashionBlogs() {
        await expect(this.page.getByRole('link', { name: this.fashionBlogsLinkSelector })).toBeVisible();
        await this.page.getByRole('link', { name: this.fashionBlogsLinkSelector }).click();
        await expect(this.page.getByText('Blog Fashion')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Fashion' })).toBeVisible();
        console.log('User successfully navigate to the Fashion blogs Page');
    }

    async verifyHeader() {
        await expect(this.page.getByText('All Categories All Categories Business Electronics Technology Fashion Search 0 0 item(s) - $')).toBeVisible();
        await expect(this.page.getByText('Shop by Category Home Special')).toBeVisible();
        console.log('Header section displayed properly on the Blogs Page');
    }

    async verifyAuthorName(blogName: string) {
        const authorSelector = `//img[@title="${blogName}"]/parent::a/parent::div/following-sibling::div/div/span[@class="author"]/a`;
        await this.page.locator(authorSelector).isVisible();
        const author = await this.page.locator(authorSelector).textContent();
        console.log("This blog belongs to the Author......." + author);
    }

    async verifyComment(blogName: string) {
        const commentSelector = `//img[@title="${blogName}"]/parent::a/parent::div/following-sibling::div/div/span[@class="comment"]`;
        await this.page.locator(commentSelector).isVisible();
        const comment = await this.page.locator(commentSelector).textContent();
        console.log("This blog has a number of comments......." + comment);
    }

    async verifyViewed(blogName: string) {
        const viewedSelector = `//img[@title="${blogName}"]/parent::a/parent::div/following-sibling::div/div/span[@class="viewed"]`;
        await this.page.locator(viewedSelector).isVisible();
        const viewed = await this.page.locator(viewedSelector).textContent();
        console.log("This blog has been viewed by people......." + viewed);
    }
}

export default Blog;
