export function generateUniqueEmail(baseEmail: string): string {
  // Check if baseEmail is empty or only contains whitespace
  if (!baseEmail.trim()) {
      return '';
  }
  const randomNumber = Math.floor(Math.random() * 1000000);
  const [username, domain] = baseEmail.split("@");
  const uniqueEmail = `${username}${randomNumber}@${domain}`;

  return uniqueEmail;
}
