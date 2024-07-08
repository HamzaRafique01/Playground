import { Locator, Page } from 'playwright';
import { test, expect } from '@playwright/test';
import { Console } from 'console';




class Login {
   

    private page: Page;
    Continue: any;
    registrationForms: any;
    loginform: any;



    constructor(page: Page) {
        this.page = page;

    }

    async ClickonMytab() {

        const login = this.page.locator('//a[contains(text(), "Login")]');
        
        await this.page.getByRole('button', { name: 'My account' }).click();
        await login.click();
    
    }

    async enterlogincredential(user_name:string, psssword:string){

        await this.page.getByPlaceholder('E-Mail Address').click();
        await this.page.getByPlaceholder('E-Mail Address').fill(user_name);
        console.log('Email...'+ user_name + '...Email Entered Successfully');

        await this.page.getByPlaceholder('Password').click();
        await this.page.getByPlaceholder('Password').fill(psssword);
        console.log('Password...'+ psssword + '...Password Entered Successfully');

    }

    async clickonloginbuttonwithinvaliddata(){

        await this.page.getByRole('button', { name: 'Login' }).click();
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

    }

    async clickonloginbuttonwithmultipleattempts(){

        await this.page.getByRole('button', { name: 'Login' }).click();
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

    }


    async clickonloginbutton(){

        await this.page.getByRole('button', { name: 'Login' }).click();
        // await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');
        
    }

    async verifylogin(){

        await this.page.getByRole('heading', { name: 'My Account' }).isVisible();

        await this.page.getByRole('heading', { name: 'My Orders' }).isVisible();

        await this.page.getByRole('heading', { name: 'My Affiliate Account' }).isVisible();

        console.log("User Successfully navigated to the My Account");

        test.setTimeout(150000);
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

    async verifyemailpasswordwarningmessage(){

         // Check Email and Password error message
         const warnigMessage = this.page.getByText("Warning: No match for E-Mail");
         const iswarningVisible = await warnigMessage.isVisible({ timeout: 5000 });
         if (iswarningVisible) {
             console.log('Warning: No match for E-Mail Address and/or Password.');
         } else {
             console.log('Email or Password verified');
         }
    }

    async requiredFieldsErrorMessage(Email: string, Password: string){
        try {
            
            // Check Email error message
            const emailError = this.page.getByText("E-Mail Address does not");
            const isEmailVisible = await emailError.isVisible({ timeout: 5000 });
            if (isEmailVisible) {
                console.log('E-Mail Address does not appear to be valid!');
            } else {
                console.log('Email Successfully Entered.........'+Email);
            }

        
            // Check Password error message
            const passwordError = this.page.getByText("Password must be between 4");
            const isPasswordVisible = await passwordError.isVisible({ timeout: 5000 });
            if (isPasswordVisible) {
                console.log('Password field is a required field');
            } else {
                console.log('Password Successfully Entered.........'+Password);
            }

          


        } catch (error) {
            console.error('Error occurred while checking required fields:', error);
        }   
    }


    async verifyaccountlockonmultipleattempts(){

        // Check Account lock error message
        const warnigMessage = this.page.getByText('Warning: Your account has');
        const iswarningVisible = await warnigMessage.isVisible({ timeout: 5000 });
        if (iswarningVisible) {
            console.log(' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour');
        } else {
            console.log('User Successfully Logged In.....');
        }
    }



    async clickonforgotpassword(){

        await expect(this.page.getByRole('link', { name: 'Forgotten Password', exact: true })).toBeVisible();

        await this.page.getByRole('link', { name: 'Forgotten Password', exact: true }).click();

        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/forgotten');

        console.log('User successfully Clicked on the Forgot Password........');

    }

    async verifyforgotpage(){

        await expect(this.page.getByRole('heading', { name: 'Forgot Your Password?' })).toBeVisible();
        console.log('Forgot Your Password?.........Element found');

        await expect(this.page.getByText('Enter the e-mail address')).toBeVisible();
        console.log('Enter the e-mail address associated with your account. Click submit to have a password reset link e-mailed to you.........Element found');
        
        await expect(this.page.getByText('Your E-Mail Address')).toBeVisible();
        console.log('Your E-Mail Address........Element found');

        await expect(this.page.getByRole('link', { name: 'Back' })).toBeVisible();
        console.log('Back Button found........');

        await this.page.getByRole('link', { name: 'Back' }).click();
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        console.log('User successfully navigate back to the login page........');
    }

} export default Login;