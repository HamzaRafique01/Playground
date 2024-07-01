// testdata.ts

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
  confirmPassword: string;
}

export interface TestData {
  registrationForms: RegistrationFormData[];
}

const testdata: TestData = {
  registrationForms: [
    {
      firstName: 'Sophia',
      lastName: 'Taylor',
      email: 'sophia.taylor@example.com',
      telephone: '9123456780',
      password: 'Sophia123!',
      confirmPassword: 'Sophia123!'
    },
    {
      firstName: 'Benjamin',
      lastName: 'Johnson',
      email: 'benjamin.johnson@example.com',
      telephone: '8234567891',
      password: 'Benjy456@',
      confirmPassword: 'Benjy456@'
    },
    {
      firstName: 'Chloe',
      lastName: 'Anderson',
      email: 'chloe.anderson@example.com',
      telephone: '7345678902',
      password: 'Chloe789#',
      confirmPassword: 'Chloe789#'
    },
    {
      firstName: 'Ethan',
      lastName: 'Martinez',
      email: 'ethan.martinez@example.com',
      telephone: '6456789013',
      password: 'Ethan456%',
      confirmPassword: 'Ethan456%'
    },
    {
      firstName: 'Amelia',
      lastName: 'Garcia',
      email: 'amelia.garcia@example.com',
      telephone: '5567890124',
      password: 'AmeliaPass!',
      confirmPassword: 'AmeliaPass!'
    }
    // Add more users as needed
  ]
};

export default testdata;
