import emailjs from '@emailjs/browser';

/**
 * Sends an email using EmailJS.
 * Requires VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY
 */
export async function sendEmail(data: Record<string, unknown>) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  return emailjs.send(
    serviceId,
    templateId,
    data,
    publicKey
  );
}

/**
 * Opens WhatsApp with a pre-filled message.
 */
export function openWhatsApp(data: {
  name: string;
  organization: string;
  message: string;
}) {
  const phone = ""; // Business phone number could be added here
  const text = encodeURIComponent(
    `Hello, I would like to request a consultation.\n\n` +
    `Name: ${data.name}\n` +
    `Organization: ${data.organization}\n` +
    `Message: ${data.message}`
  );
  
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}
