interface LoginSingleuser {
   
    loginS: loginS;

}

interface loginS {

    email: string;
    password: string;


}

const Loginsingleuser: LoginSingleuser = {

    loginS: {

        email: 'testing123@yopmail.com',
        password: 'P@ss1234',
    
    }

}

export default Loginsingleuser;