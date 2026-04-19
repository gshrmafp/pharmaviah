import emailjs from '@emailjs/browser';

/**
 * Sends an email using EmailJS.
 * Requires VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY
 */
export async function sendEmail(data: Record<string, unknown>) {
  const serviceId = "service_m8juwtc";
  const templateId = "template_ihthi52";
  const publicKey = "OQPytgeTOJk8IQeNR";

  console.log(serviceId, templateId, publicKey);
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
