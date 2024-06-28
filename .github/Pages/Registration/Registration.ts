import { Locator, Page } from 'playwright';
import { test, expect } from '@playwright/test';

class Registration {
    private page: Page;
    Continue: any;
  registrationForms: any;


    constructor(page: Page) {
        this.page = page;
        // const first_Name = page.locator('//input[@name="firstname"]');
        // const last_Name = page.locator('//input[@name="lastname"]');
        // const email = page.locator('//input[@name="email"]');
        // const telephone = page.locator('//input[@name="telephone"]');
        // const Password = page.locator('//input[@name="password"]');
        // const Password_Confirm = page.locator('//input[@name="confirm"]');


    }

    async ClickonMytab() {

        const register = this.page.locator('//a[contains(text(), "Register")]');
        
        await this.page.getByRole('button', { name: 'My account' }).click();
        await register.click();
    
    }

    async fillRegistrationForm(firstName:string, lastName:string,email:string,telephone:string,password:string,confirmPassword:string){

        await this.page.getByPlaceholder('First Name').click();
        await this.page.getByPlaceholder('First Name').fill(firstName);
        console.log('First Name...'+firstName+ ' Entered Successfully');

        await this.page.getByPlaceholder('Last Name').click();
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        console.log('Last Name...'+lastName+' Entered Successfully');

        await this.page.getByPlaceholder('E-Mail').click();
        await this.page.getByPlaceholder('E-Mail').fill(email);
        console.log('Email...'+email+ ' Entered Successfully');

        await this.page.getByPlaceholder('Telephone').click();
        await this.page.getByPlaceholder('Telephone').fill(telephone);
        console.log('Telephone...'+telephone+' Entered Successfully');

        await this.page.getByPlaceholder('Password', { exact: true }).click();
        await this.page.getByPlaceholder('Password', { exact: true }).fill(password);
        console.log('Password...'+password+' Entered Successfully');

        await this.page.getByPlaceholder('Password Confirm').click();
        await this.page.getByPlaceholder('Password Confirm').fill(confirmPassword);
        console.log('Password Confirm...'+confirmPassword+' Entered Successfully');

        await this.page.getByText('I have read and agree to the').click();
        console.log("Checkbox checked Successfully");

    }

    async clicktoContinue(){

        const Continue =  await this.page.getByRole('button',{name:'Continue'});

        if(await Continue.isVisible()){

            await Continue.click();
            console.log("Continue Button Clicked Successfully");

            await this.page.waitForSelector('text=Your Account Has Been Created!'); // Wait for success message
            const successMessage = await this.page.locator('text=Your Account Has Been Created!');
            expect(successMessage).toBeVisible(); // Assert that success message is visible

            if(await this.page.getByRole('link', { name: 'Continue' }).isVisible()){

                await this.page.getByRole('link', { name: 'Continue' }).click()
            }else{
                console.log("Continue Buttonnn Not Found");
            }
        }else{
            console.log("Continue Button Not Found");
        }
    }


    async verifymyaccount(){

        await this.page.getByRole('heading', { name: 'My Account' }).isVisible();

        await this.page.getByRole('heading', { name: 'My Orders' }).isVisible();

        await this.page.getByRole('heading', { name: 'My Affiliate Account' }).isVisible();

        console.log("User Successfully navigated to the My Account");

        await this.page.getByRole('link', { name: 'Logout' }).click();

        console.log("User Successfully Logged Out.....");

        test.setTimeout(150000);

    }



} export default Registration;