# Email OTP Setup Guide (Resend)

This guide explains how to set up email OTP (One-Time Password) verification for the EdPear platform using **Resend**.

## 1. Get a Resend API Key

1.  Go to [Resend](https://resend.com) and sign up for a free account.
2.  Navigate to the **API Keys** section in the dashboard.
3.  Click **Create API Key**.
4.  Give it a name (e.g., "EdPear Production") and select "Full Access".
5.  Copy the API key starting with `re_`.

## 2. Configure Environment Variables

Add the following to your `.env.local` (local development) and your Vercel project's Environment Variables:

```env
# Resend API Configuration
RESEND_API_KEY=re_your_copied_api_key

# The sender email address
# For testing (without a custom domain), use: EdPear <onboarding@resend.dev>
# For production, verify your domain in Resend and use your own email (e.g., hello@yourdomain.com)
EMAIL_FROM=EdPear <onboarding@resend.dev>
```

## 3. (Optional) Verify a Custom Domain

For production use, you should verify your domain in Resend to remove the `onboarding@resend.dev` restriction:

1.  In the Resend dashboard, go to **Domains**.
2.  Click **Add Domain**.
3.  Enter your domain name.
4.  Add the provided DNS records to your domain provider (GoDaddy, Namecheap, etc.).
5.  Once verified, you can change `EMAIL_FROM` to use any address on your domain.

## How it works

- When a user tries to authorize the CLI, the server generates a 6-digit OTP.
- The `lib/email-service.ts` uses the `resend` SDK to send the email.
- The email is styled with a professional template.
- If `RESEND_API_KEY` is missing in development, the OTP will be logged to the terminal console instead of sending an email.

## Troubleshooting

- **Email not arriving?** Check if you're using `onboarding@resend.dev` as the sender. If you are, you can only send to the email address you signed up with at Resend unless you verify a domain.
- **API Error?** Ensure the `RESEND_API_KEY` is correctly copied and has not been revoked.
- **Vercel Deployment?** Make sure you add `RESEND_API_KEY` to your Vercel environment variables and redeploy.
