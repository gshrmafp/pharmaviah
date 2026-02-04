# Email Setup for PharmViah Contact Form

The contact form uses **contact@pharmviah.com** as the official email. To enable form submissions, configure one of these options:

## Recommended Options (Low-Cost)

### 1. Zoho Mail (Free with Custom Domain)
- **Cost:** Free tier available for custom domain (e.g., pharmviah.com)
- **Setup:** Create a Zoho Mail account, add your domain, use contact@pharmviah.com
- **Integration:** Use Zoho's SMTP with EmailJS or a backend SMTP relay
- **Benefits:** Professional email, no cost for basic use

### 2. Low-Cost SMTP Providers
- **Resend** – Developer-friendly, generous free tier
- **SendGrid** – 100 emails/day free
- **Mailgun** – Free tier for testing
- **Brevo (Sendinblue)** – 300 emails/day free

## Current Setup (EmailJS)

The project uses [EmailJS](https://www.emailjs.com/) for client-side form submission. Configure in `.env`:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Important:** In your EmailJS email template, set the recipient to **contact@pharmviah.com** so all form submissions arrive at the official inbox.

## Backend Alternative

The server has a `/api/contact` endpoint. For production, consider:
1. Using a server-side SMTP library (e.g., Nodemailer) with Zoho or another provider
2. Forwarding submissions to contact@pharmviah.com
3. Storing in database with optional email notifications
