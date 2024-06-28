import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';


class Registration {
    private page: Page;
    Continue: any;


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
        
        await this.page.getByRole('button', { name: 'My account' }).click();
        await this.page.getByRole('link', { name: 'Register'}).click();
    
    }

    async datafilling(First_Name: string, Last_Name: string, Email: string, Telephone: string, Password: string, Password_Confirm: string){

        await this.page.getByPlaceholder('First Name').click();
        await this.page.getByPlaceholder('First Name').fill(First_Name);
        console.log("First Name Entered Successfully");

        await this.page.getByPlaceholder('Last Name').click();
        await this.page.getByPlaceholder('Last Name').fill(Last_Name);
        console.log("Last Name Entered Successfully");

        await this.page.getByPlaceholder('E-Mail').click();
        await this.page.getByPlaceholder('E-Mail').fill(Email);
        console.log("Email Entered Successfully");

        await this.page.getByPlaceholder('Telephone').click();
        await this.page.getByPlaceholder('Telephone').fill(Telephone);
        console.log("Telephone Entered Successfully");

        await this.page.getByPlaceholder('Password', { exact: true }).click();
        await this.page.getByPlaceholder('Password', { exact: true }).fill(Password);
        console.log("Password Entered Successfully");

        await this.page.getByPlaceholder('Password Confirm').click();
        await this.page.getByPlaceholder('Password Confirm').fill(Password_Confirm);
        console.log("Password Confirm Entered Successfully");

        await this.page.getByText('I have read and agree to the').click();
        console.log("Checkbox checked Successfully");

    }

    async clicktoContinue(){

        const Continue =  await this.page.getByRole('button',{name:'Continue'});

        if(await Continue.isVisible()){

            await Continue.click();
            console.log("Continue Button Clicked Successfully");

            // const Confirm_Continue = await this.page.locator().isVisible();

            await expect('Your Account Has Been Created').toContain("Your Account Has Been Created");

            if(await (await this.page.waitForSelector('text= Your Account Has Been Created!')).isVisible()){

                console.log("Your Account has been Created!");

                if(await this.page.getByRole('link',{name:'Continue'}).isVisible()){

                    await this.page.getByRole('link',{name:'Continue'}).click();
                    console.log("User successfully navigated to My Account");
                    await this.page.waitForTimeout(5000);
                }else{
                    console.log("Confirm Continue Button Not Found");
                }
            }else{
                console.log("Failed to create account");
            }
        }else{
            console.log("Continue Button Not Found");
        }
    }


    async verifymyaccount(){

        await this.page.getByRole('heading', { name: 'My Account' }).isVisible();
        console.log("User Successfully navigated to the My Account");

    }
  

} export default Registration;



