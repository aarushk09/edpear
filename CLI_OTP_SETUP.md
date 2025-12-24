# Email OTP Setup Guide (Brevo)

This guide explains how to set up email OTP (One-Time Password) verification for the EdPear platform using **Brevo** (formerly Sendinblue).

## 1. Get a Brevo API Key

1.  Go to [Brevo](https://www.brevo.com/) and sign up for a free account.
2.  Once logged in, click on your name at the top right and select **SMTP & API**.
3.  Go to the **API Keys** tab.
4.  Click **Generate a new API key**.
5.  Give it a name (e.g., "EdPear CLI") and copy the key (it starts with `xkeysib-`).

## 2. Configure Environment Variables

Add the following to your `.env.local` (local development) and your Vercel project's Environment Variables:

```env
# Brevo API Configuration
BREVO_API_KEY=xkeysib-your_copied_api_key

# The sender email address
# Important: This email must be a verified sender in your Brevo account.
# You can add/verify senders in Brevo under "Senders & IP" > "Senders".
EMAIL_FROM=noreply@yourdomain.com
```

## 3. (Optional) Verify Your Domain

While Brevo allows you to send emails from a verified email address, it is highly recommended to authenticate your domain (DKIM) for better deliverability.

1.  In Brevo, go to **Senders & IP** > **Domains**.
2.  Click **Add a domain**.
3.  Follow the instructions to add the required TXT/DNS records to your domain provider.

## How it works

- When a user tries to authorize the CLI, the server generates a 6-digit OTP.
- The `lib/email-service.ts` uses the `@getbrevo/brevo` SDK to send the email.
- The email is styled with a professional template.
- If `BREVO_API_KEY` is missing in development, the OTP will be logged to the terminal console instead of sending an email.

## Troubleshooting

- **Email not arriving?** 
  - Check your Brevo dashboard's "Transactional" tab to see if the email was sent or bounced.
  - Ensure the `EMAIL_FROM` address exactly matches a verified sender in Brevo.
  - Check your spam folder.
- **API Error?** Ensure the `BREVO_API_KEY` is correctly copied.
- **Vercel Deployment?** Make sure you add `BREVO_API_KEY` to your Vercel environment variables and redeploy.
