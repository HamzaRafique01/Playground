export function generateUniqueEmail(baseEmail: string): string {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const [username, domain] = baseEmail.split("@");
    const uniqueEmail = `${username}${randomNumber}@${domain}`;
    console.log(uniqueEmail);
    return uniqueEmail;
  }