/**
 * Converts a Sri Lankan phone number into
 * WhatsApp international number format.
 *
 * Examples:
 *
 * 0771234567
 *      ↓
 * 94771234567
 *
 * 94771234567
 *      ↓
 * 94771234567
 *
 * +94771234567
 *      ↓
 * 94771234567
 */
export function normalizeSriLankanPhoneNumber(
  phoneNumber: string
): string {
  // Remove spaces, +, -, brackets, etc.
  let phone = phoneNumber.replace(/\D/g, "");

  /**
   * Local Sri Lankan number
   *
   * 0771234567
   *
   * becomes
   *
   * 94771234567
   */
  if (phone.startsWith("0")) {
    phone = "94" + phone.substring(1);
  }

  /**
   * If user enters:
   *
   * 771234567
   *
   * add Sri Lankan country code.
   */
  if (!phone.startsWith("94")) {
    phone = "94" + phone;
  }

  return phone;
}

/**
 * Creates the message that will be
 * pre-filled inside WhatsApp.
 */
export function createWhatsAppMessage(
  quote: string,
  description: string,
  invitationUrl: string
): string {
  return `💍 Wedding Invitation

"${quote}"

${description}

✨ View Wedding Invitation:
${invitationUrl}

We would be delighted to celebrate this special day with you. ❤️`;
}

/**
 * Creates the WhatsApp Web URL.
 *
 * Example result:
 *
 * https://web.whatsapp.com/send?phone=94771234567&text=...
 *
 * The recipient does NOT need to be saved
 * in your contacts.
 */
export function createWhatsAppUrl(
  phoneNumber: string,
  quote: string,
  description: string,
  invitationUrl: string
): string {
  const normalizedPhone =
    normalizeSriLankanPhoneNumber(phoneNumber);

  const message = createWhatsAppMessage(
    quote,
    description,
    invitationUrl
  );

  const encodedMessage =
    encodeURIComponent(message);

  return `https://web.whatsapp.com/send?phone=${normalizedPhone}&text=${encodedMessage}`;
}