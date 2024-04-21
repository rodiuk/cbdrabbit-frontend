export function maskEmailAddress(email: string): string {
  if (!email) return "";
  let parts = email.split("@");
  let localPart = parts[0];
  let domain = parts[1];

  let numStars = Math.floor(localPart.length / 2);

  let maskedLocalPart =
    localPart.substring(0, numStars) + "*".repeat(localPart.length - numStars);

  let maskedEmail = maskedLocalPart + "@" + domain;

  return maskedEmail;
}
