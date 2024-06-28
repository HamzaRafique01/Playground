interface TestData {
   
    Registration_form: Registration_form;

}

interface Registration_form {
    First_Name: string;
    Last_Name: string;
    Email: string;
    Telephone: string;
    Password: string;
    Password_Confirm: string;

}

const testData: TestData = {

    Registration_form: {

        First_Name: 'ABC',
        Last_Name: 'XYZ',
        Email: 'testing12sa3@yopmail.com',
        Telephone: '1234567890',
        Password: 'P@ss1234',
        Password_Confirm: 'P@ss1234',
    }

}

export default testData;

