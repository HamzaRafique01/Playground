import { Locator, Page } from 'playwright';
import { test, expect } from '@playwright/test';
import { Console } from 'console';

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
        console.log('First Name...'+ firstName + '...Entered Successfully');

        await this.page.getByPlaceholder('Last Name').click();
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        console.log('Last Name...'+ lastName +'...Entered Successfully');

        await this.page.getByPlaceholder('E-Mail').click();
        await this.page.getByPlaceholder('E-Mail').fill(email);
        console.log('Email...'+email + '...Entered Successfully');

        await this.page.getByPlaceholder('Telephone').click();
        await this.page.getByPlaceholder('Telephone').fill(telephone);
        console.log('Telephone...'+ telephone +'...Entered Successfully');

        await this.page.getByPlaceholder('Password', { exact: true }).click();
        await this.page.getByPlaceholder('Password', { exact: true }).fill(password);
        console.log('Password...'+ password +'...Entered Successfully');

        await this.page.getByPlaceholder('Password Confirm').click();
        await this.page.getByPlaceholder('Password Confirm').fill(confirmPassword);
        console.log('Password Confirm...'+ confirmPassword +'...Entered Successfully');

    }


    async verifyprivacypolicycheckbox(){

        await this.page.getByText('I have read and agree to the').click();
        console.log("Checkbox checked Successfully");
    }

    async clicktoContinue(){

        const Continue =  this.page.getByRole('button', { name: 'Continue' });

        if(await Continue.isVisible()){

            await Continue.click();
            console.log("Continue Button Clicked Successfully"); 
        }else{
            console.log("Continue Button Not Found");
        }
    }

    async registrationwithsameemail(){

        const warnigMessage = await expect(this.page.getByText('Warning: E-Mail Address is')).toBeVisible();
        expect(warnigMessage); // Assert that Warning message is visible

        console.log(' Warning: E-Mail Address is already registered!........');
        
    }




    async continueonsuccesscreate(){

        await this.page.waitForSelector('text=Your Account Has Been Created!'); // Wait for success message
            const successMessage = this.page.locator('text=Your Account Has Been Created!');
            expect(successMessage).toBeVisible(); // Assert that success message is visible

            if(await this.page.getByRole('link', { name: 'Continue' }).isVisible()){

                await this.page.getByRole('link', { name: 'Continue' }).click()
            }else{
                console.log("Continue Buttonnn Not Found");
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
    
    async requiredFieldsErrorMessage(First_Name, Last_Name, Email, Telephone, Password,Password_Confirm) {
        try {
            
            // Check First Name error message
            const firstNameError = this.page.getByText("First Name must be between 1");
            const isFirstNameVisible = await firstNameError.isVisible({ timeout: 5000 });
            if (isFirstNameVisible) {
                console.log('First Name field is a required field & must be between 1 and 32 characters!');
            } else {
                console.log('First Name Successfully Entered.........'+First_Name);
            }

            // Check Last Name error message
            const lastNameError = this.page.getByText("Last Name must be between 1");
            const isLastNameVisible = await lastNameError.isVisible({ timeout: 5000 });
            if (isLastNameVisible) {
                console.log('Last Name field is a required field & must be between 1 and 32 characters!');
            } else {
                console.log('Last Name Successfully Entered.........'+Last_Name);
            }

            // Check Email error message
            const emailError = this.page.getByText("E-Mail Address does not");
            const isEmailVisible = await emailError.isVisible({ timeout: 5000 });
            if (isEmailVisible) {
                console.log('Email field is a required field & E-Mail Address does not appear to be valid!');
            } else {
                console.log('Email Successfully Entered.........'+Email);
            }

            // Check Telephone error message
            const telephoneError = this.page.getByText("Telephone must be between 3");
            const isTelephoneVisible = await telephoneError.isVisible({ timeout: 5000 });
            if (isTelephoneVisible) {
                console.log('Telephone field is a required field & must be between 3 and 32 characters!');
            } else {
                console.log('Telephone Successfully Entered.........'+Telephone);
            }

            // Check Password error message
            const passwordError = this.page.getByText("Password must be between 4");
            const isPasswordVisible = await passwordError.isVisible({ timeout: 5000 });
            if (isPasswordVisible) {
                console.log('Password field is a required field & must be between 4 and 20 characters!');
            } else {
                console.log('Password Successfully Entered.........'+Password);
            }

            // Check Confirm Password error message
            const CpasswordError = this.page.getByText("Password confirmation does'");
            const isCPasswordVisible = await CpasswordError.isVisible({ timeout: 5000 });
            if (isCPasswordVisible) {
                console.log('Confirm Password field is a required field & must be same with Password!');
            } else {
                console.log('Confirm Password Successfully Entered.........'+Password_Confirm);
            }


        } catch (error) {
            console.error('Error occurred while checking required fields:', error);
        }   
    }

    async comparepasswordandCpassword(Password,Password_Confirm){


        if(Password == Password_Confirm){

            console.log('Both Passwords are Matched');
        }else{
            await expect(this.page.getByText('Password confirmation does')).toBeVisible();
            console.log('Password confirmation does not match password!');
        }

    }


    

    async agreetothePrivacyPolicy(){

        // Check Privacy policy error message
        const warnigMessage = this.page.getByText("Warning: You must agree to");
        const iswarningVisible = await warnigMessage.isVisible({ timeout: 5000 });
        if (iswarningVisible) {
            console.log('Warning: You must agree to the Privacy Policy!');
        } else {
            console.log('Privacy Policy Checked successfully');
        }
    }


} export default Registration;