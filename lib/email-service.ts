import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an OTP email to the user using Resend.
 * @param email - Recipient email address
 * @param otp - 6-digit verification code
 * @param userName - Optional name of the user
 */
export async function sendOTPEmail(email: string, otp: string, userName?: string) {
  try {
    // If no Resend API key is configured, log the OTP for development
    if (!process.env.RESEND_API_KEY) {
      console.log('📧 Resend API Key not found. OTP Email (Development Mode):');
      console.log(`   To: ${email}`);
      console.log(`   OTP: ${otp}`);
      console.log('   ⚠️  Configure RESEND_API_KEY in .env.local for production email delivery');
      return { success: true, message: 'OTP logged to console (RESEND_API_KEY missing)' };
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'EdPear <onboarding@resend.dev>',
      to: email,
      subject: 'EdPear CLI Authentication Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>EdPear CLI Authentication</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eef2f6;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">EdPear</h1>
              <p style="color: #64748b; margin-top: 8px; font-size: 14px;">CLI Authentication</p>
            </div>
            
            <p style="color: #334155; font-size: 16px;">Hello${userName ? ` ${userName}` : ''},</p>
            <p style="color: #334155; font-size: 16px;">You requested to authenticate your CLI. Use the code below to complete the process:</p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; text-align: center; margin: 32px 0;">
              <div style="font-size: 36px; font-weight: 800; letter-spacing: 12px; color: #3b82f6; font-family: 'SF Mono', ui-monospace, Monaco, monospace; text-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                ${otp}
              </div>
            </div>
            
            <p style="color: #64748b; font-size: 14px; text-align: center;">This code will expire in <strong>10 minutes</strong>.</p>
            <p style="color: #94a3b8; font-size: 13px; text-align: center; margin-top: 24px;">If you didn't request this code, you can safely ignore this email.</p>
            
            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} EdPear Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
EdPear CLI Authentication

Hello${userName ? ` ${userName}` : ''},

You requested to authenticate your CLI. Use the code below to complete the process:

${otp}

This code will expire in 10 minutes.

If you didn't request this code, you can safely ignore this email.

© ${new Date().getFullYear()} EdPear Platform. All rights reserved.
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, messageId: data?.id };
  } catch (error: any) {
    console.error('Email sending error:', error);
    // In development/test environments, we might want to still see the OTP even if Resend fails
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 OTP (Fallback due to error):', otp);
    }
    throw error;
  }
}
