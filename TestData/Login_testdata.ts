interface Login_data {
   
    Login_form: Login_form[];

}

interface Login_form {

    email: string;  
    password: string;

}

const login_testdata: Login_data = {

    Login_form: [

        {

            email: 'testing@yopmail.com',
            password: 'P@ss1234',
           
        },
        {

            email: 'testing@yopmail.com',
            password: 'P@ss1234',
           
        },
        {

            email: 'testing@yopmail.com',
            password: 'P@ss1234',
           
        },
        {

            email: 'testing@yopmail.com',
            password: 'P@ss1234',
           
        },
        {

            email: 'asfa@yopmail.com',
            password: 'P@ss1234',
           
        }, 
        {

            email: 'gfgs@yopmail.com',
            password: 'P@ss1234',
           
        },
        {

            email: 'gtsd@yopmail.com',
            password: 'P@ss1234',
           
        },
        {

            email: 'tg@yopmail.com',
            password: 'P@ss1234',
           
        }
    ]
    

}

export default login_testdata;