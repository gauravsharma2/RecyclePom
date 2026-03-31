// ===== EXTERNAL SERVICE CONFIGURATION =====
// Fill in these values after creating accounts at each service.
// All services have free tiers that work for this app.

export const config = {
  // EmailJS — https://emailjs.com (free: 200 emails/month)
  // 1. Sign up → Add Email Service → Create Templates → Get keys
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    contactTemplateId: 'YOUR_CONTACT_TEMPLATE_ID',
    fosterTemplateId: 'YOUR_FOSTER_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  },

  // Stripe — https://dashboard.stripe.com/payment-links
  // Create a Payment Link in Stripe dashboard, paste the URL here
  stripe: {
    donationLink: '', // e.g. 'https://donate.stripe.com/your-link-id'
  },

  // Google Analytics 4 — https://analytics.google.com
  // Create a property → Get Measurement ID
  analytics: {
    measurementId: '', // e.g. 'G-XXXXXXXXXX'
  },
}
