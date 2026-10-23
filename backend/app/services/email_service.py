import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Dict, List, Optional
from app.core.config import settings

logger = logging.getLogger("forma.email")


class EmailMessageRecord:
    def __init__(self, to_email: str, subject: str, body_text: str, body_html: str):
        self.to_email = to_email
        self.subject = subject
        self.body_text = body_text
        self.body_html = body_html


class EmailService:
    def __init__(self):
        # Development outbox for local testing and inspection
        self.dev_outbox: List[EmailMessageRecord] = []

    def _build_email_html(
        self,
        *,
        title: str,
        subtitle: str,
        action_url: str,
        action_label: str,
        info_note: str,
        preview_text: str,
        otp: Optional[str] = None,
    ) -> str:
        """
        Renders a responsive, modern HTML email template mirroring the FORMA Login Page aesthetic:
        Clean white card, obsidian black badge & CTA button, refined typography, and subtle borders.
        """
        otp_block = f"""
                    <!-- 6-digit OTP Code Box -->
                    <div style="background-color: #F8F9FA; border: 1.5px dashed #D4D4D8; border-radius: 10px; padding: 18px 12px; text-align: center; margin: 16px 0 20px 0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #71717A; font-weight: 600; margin-bottom: 6px;">
                        Verification Code
                      </div>
                      <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 34px; font-weight: 800; letter-spacing: 10px; color: #09090B; display: inline-block; padding-left: 10px;">
                        {otp}
                      </div>
                      <div style="font-size: 11px; color: #71717A; margin-top: 6px;">
                        Valid for {settings.EMAIL_VERIFICATION_OTP_EXPIRE_MINUTES} minutes. Do not share this code.
                      </div>
                    </div>
        """ if otp else ""

        return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — FORMA</title>
  <style>
    /* Reset & Base Styles */
    body, table, td, p, a, li, blockquote {{
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }}
    body {{
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #F8F9FA;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      line-height: 1.5;
    }}
    img {{
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }}
    table {{
      border-collapse: collapse !important;
    }}
    /* Interactive Hover */
    .btn-cta:hover {{
      background-color: #27272A !important;
    }}
    .link-subtle:hover {{
      color: #111827 !important;
      text-decoration: underline !important;
    }}
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F9FA;">
  <!-- Preview Text (Hidden in body, displayed in email client snippet) -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #F8F9FA;">
    {preview_text}
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8F9FA; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Wrapper Container (Matches max-width of Login Page card) -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 440px; margin: 0 auto;">
          
          <!-- Brand Header -->
          <tr>
            <td align="left" style="padding-bottom: 20px; padding-left: 4px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <!-- Forma Glyph Badge -->
                    <div style="width: 28px; height: 28px; background-color: #09090B; border-radius: 8px; text-align: center; line-height: 28px; display: inline-block;">
                      <span style="color: #FFFFFF; font-weight: 800; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Space Grotesk', sans-serif;">F</span>
                    </div>
                  </td>
                  <td style="vertical-align: middle; padding-left: 10px;">
                    <span style="font-size: 15px; font-weight: 700; letter-spacing: -0.02em; color: #09090B; display: inline-block;">FORMA</span>
                    <span style="font-size: 11px; color: #71717A; margin-left: 6px; font-weight: 400;">Give thought its form.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Glassmorphic / Card Frame -->
          <tr>
            <td>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 14px; box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03); overflow: hidden;">
                <tr>
                  <td style="padding: 28px 26px 24px 26px;">
                    
                    <!-- Top Glyph Icon Badge (Mirrors AuthLayout squircle badge) -->
                    <div style="width: 36px; height: 36px; background-color: #09090B; border-radius: 10px; text-align: center; line-height: 36px; margin-bottom: 16px;">
                      <!-- Inlined geometric glyph SVG for universal client rendering -->
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; display: inline-block;">
                        <path d="M5 4H19L14 12H5V4Z" fill="#FFFFFF" fill-opacity="1" />
                        <path d="M5 12H13L8 20H5V12Z" fill="#FFFFFF" fill-opacity="0.5" />
                        <path d="M14 12L19 4L16 20L11 20L14 12Z" fill="#FFFFFF" fill-opacity="0.25" />
                      </svg>
                    </div>

                    <!-- Header: Title & Subtitle -->
                    <h1 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 700; color: #09090B; letter-spacing: -0.02em; line-height: 1.3;">
                      {title}
                    </h1>
                    <p style="margin: 0 0 16px 0; font-size: 12.5px; color: #52525B; line-height: 1.55;">
                      {subtitle}
                    </p>

                    {otp_block}

                    <!-- Prominent Black Action Button (Matches Login 'Sign in' button) -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 22px;">
                      <tr>
                        <td>
                          <a href="{action_url}" target="_blank" class="btn-cta" style="display: block; width: 100%; box-sizing: border-box; background-color: #09090B; color: #FFFFFF; font-size: 13px; font-weight: 600; text-align: center; text-decoration: none; padding: 11px 18px; border-radius: 8px; letter-spacing: -0.01em; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                            {action_label} &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Security / Expiration Notice Box -->
                    <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 11px 13px; margin-bottom: 20px;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="vertical-align: top; width: 18px; padding-top: 1px;">
                            <span style="font-size: 13px; line-height: 1;">&#128274;</span>
                          </td>
                          <td style="padding-left: 8px; font-size: 11.5px; color: #52525B; line-height: 1.5;">
                            {info_note}
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Direct Fallback Link Box -->
                    <div style="border-top: 1px solid #F1F2F4; padding-top: 14px;">
                      <p style="margin: 0 0 6px 0; font-size: 11px; color: #71717A; font-weight: 500;">
                        Direct access URL:
                      </p>
                      <div style="background-color: #F8F9FA; border: 1px solid #E5E7EB; border-radius: 6px; padding: 8px 10px; font-family: monospace; font-size: 10.5px; color: #3F3F46; word-break: break-all; line-height: 1.4;">
                        <a href="{action_url}" target="_blank" style="color: #18181B; text-decoration: underline;">{action_url}</a>
                      </div>
                    </div>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sub-Footer (Matches Login Page sub-footer) -->
          <tr>
            <td align="center" style="padding-top: 20px; font-size: 11px; color: #9CA3AF; line-height: 1.6;">
              <div>&copy; 2026 Forma, Inc. All rights reserved.</div>
              <div style="margin-top: 4px;">
                <span style="color: #71717A;">Privacy</span> &bull;
                <span style="color: #71717A;">Terms of Service</span> &bull;
                <span style="color: #71717A;">Security</span>
              </div>
              <div style="margin-top: 6px; font-size: 10.5px; color: #A1A1AA;">
                Give thought its form.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""

    async def send_password_reset_email(self, to_email: str, raw_token: str) -> bool:
        reset_url = f"{settings.FRONTEND_ORIGIN}/reset-password?token={raw_token}"
        subject = f"{settings.PROJECT_NAME} — Reset Your Password"
        
        text_content = f"""Hello,

We received a request to reset your password for your FORMA account.
Click the link below to set a new password:

{reset_url}

This link is valid for {settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES} minutes and can only be used once.
If you did not request this password reset, please ignore this email.

— The FORMA Team
Give thought its form.
"""

        html_content = self._build_email_html(
            title="Reset your password",
            subtitle="We received a request to reset the password for your FORMA account. Click the button below to set a new password.",
            action_url=reset_url,
            action_label="Reset Password",
            info_note=f"This single-use link expires in <strong>{settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES} minutes</strong>. If you did not initiate this request, no action is required.",
            preview_text="Reset your FORMA password securely.",
        )

        return await self._dispatch(to_email, subject, text_content, html_content)

    async def send_verification_email(self, to_email: str, raw_token: str, otp: Optional[str] = None) -> bool:
        verify_url = f"{settings.FRONTEND_ORIGIN}/verify-email?email={to_email}&otp={otp or ''}&token={raw_token}"
        subject = f"{settings.PROJECT_NAME} — {f'Your Verification Code is {otp}' if otp else 'Verify Your Email'}"

        text_content = f"""Welcome to FORMA!

{f'Your 6-digit verification code is: {otp}' if otp else ''}

Please verify your email address to confirm your account by entering the code or clicking the link below:

{verify_url}

This code is valid for {settings.EMAIL_VERIFICATION_OTP_EXPIRE_MINUTES} minutes.

— The FORMA Team
Give thought its form.
"""

        html_content = self._build_email_html(
            title="Verify your email address",
            subtitle="Thank you for creating your FORMA account. Enter the 6-digit code below to activate your account.",
            action_url=verify_url,
            action_label="Verify Email Directly",
            info_note=f"This verification code expires in <strong>{settings.EMAIL_VERIFICATION_OTP_EXPIRE_MINUTES} minutes</strong>. If you did not create a FORMA account, you can disregard this email.",
            preview_text=f"Your FORMA verification code is {otp}." if otp else "Confirm your email to get started with FORMA.",
            otp=otp,
        )

        return await self._dispatch(to_email, subject, text_content, html_content)

    async def _dispatch(self, to_email: str, subject: str, text: str, html: str) -> bool:
        record = EmailMessageRecord(to_email, subject, text, html)
        self.dev_outbox.append(record)

        if settings.EMAIL_PROVIDER == "smtp" and settings.SMTP_HOST:
            # Deliverability pre-check: Never send via SMTP to non-existent or unmailable domains
            from app.core.security import validate_email_deliverability
            is_deliverable, reason = validate_email_deliverability(to_email)
            if not is_deliverable:
                logger.warning("Aborting SMTP delivery to %s: %s", to_email, reason)
                return False

            try:
                msg = MIMEMultipart("alternative")
                msg["Subject"] = subject
                msg["From"] = settings.SMTP_FROM_EMAIL
                msg["To"] = to_email
                msg.attach(MIMEText(text, "plain"))
                msg.attach(MIMEText(html, "html"))

                with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
                    if settings.SMTP_TLS:
                        server.starttls()
                    if settings.SMTP_USERNAME and settings.SMTP_PASSWORD:
                        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                    server.sendmail(settings.SMTP_FROM_EMAIL, [to_email], msg.as_string())
                logger.info("Email delivered via SMTP to %s", to_email)
                return True
            except Exception as e:
                logger.error("Failed to deliver email via SMTP: %s", e)
                # Fall through to console logging in development
        
        # Development mode / fallback logging
        logger.info(
            "\n==================== [DEV EMAIL OUTBOX] ====================\n"
            "TO: %s\nSUBJECT: %s\n\n%s\n"
            "============================================================",
            to_email,
            subject,
            text,
        )
        return True


email_service = EmailService()
