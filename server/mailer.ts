import nodemailer from 'nodemailer';

export interface SendResetEmailOptions {
  toEmail: string;
  userName?: string;
  resetToken: string;
  baseUrl: string;
}

export interface MailerResult {
  sent: boolean;
  configured: boolean;
  resetUrl: string;
  error?: string;
}

/**
 * Servicio de envío de correos reales para recuperación de contraseña en VocAcción.
 * Admite configuración SMTP estándar (Gmail, Outlook, Amazon SES, SendGrid, Resend SMTP, Mailgun).
 */
export async function sendPasswordResetEmailService(options: SendResetEmailOptions): Promise<MailerResult> {
  const { toEmail, userName = 'Estudiante VocAcción', resetToken, baseUrl } = options;
  const cleanBase = baseUrl.replace(/\/$/, '');
  const resetUrl = `${cleanBase}/#reset-token=${resetToken}`;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"VocAcción Orientación" <${user || 'soporte@vocaccion.edu'}>`;

  // Comprobar si las credenciales de correo están configuradas
  const isConfigured = Boolean(host && user && pass);

  if (!isConfigured) {
    console.info(`[VocAcción Mailer] Variables SMTP no detectadas (SMTP_HOST, SMTP_USER, SMTP_PASS).`);
    console.info(`[VocAcción Mailer] Enlace seguro generado para ${toEmail}: ${resetUrl}`);
    return {
      sent: false,
      configured: false,
      resetUrl
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass
      }
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña - VocAcción</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF7F2; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="560px" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 24px; border: 1px solid #f1e7db; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="padding: 32px 32px 24px; text-align: center; background: linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 100%); border-bottom: 1px solid #f3e8ff;">
                    <div style="display: inline-block; padding: 8px 16px; background-color: #ffffff; border-radius: 9999px; border: 1px solid #fbcfe8; font-size: 11px; font-weight: 700; color: #db2777; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                      Seguridad de la Cuenta
                    </div>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #0f172a; letter-spacing: -0.02em;">
                      Voc<span style="color: #db2777;">Acción</span>
                    </h1>
                    <p style="margin: 6px 0 0; font-size: 13px; color: #64748b; font-weight: 500;">
                      Orientación Vocacional Juvenil & Profesional
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 32px;">
                    <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #0f172a;">
                      Hola, ${userName} 👋
                    </h2>
                    <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #475569;">
                      Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>VocAcción</strong>.
                    </p>
                    <p style="margin: 0 0 28px; font-size: 14px; line-height: 1.6; color: #475569;">
                      Para crear tu nueva contraseña y recuperar el acceso a tus resultados del test RIASEC y carreras guardadas, haz clic en el siguiente botón:
                    </p>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 32px 0;">
                      <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #db2777 0%, #9333ea 50%, #4f46e5 100%); color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 14px; box-shadow: 0 4px 14px rgba(147, 51, 234, 0.35);">
                        Restablecer mi Contraseña
                      </a>
                    </div>

                    <!-- Security Alert -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; margin: 28px 0 20px;">
                      <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; color: #334155;">
                        ⏱️ Validez del enlace:
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                        Este enlace caducará automáticamente en <strong>1 hora</strong> y solo puede usarse una vez por motivos de seguridad.
                      </p>
                    </div>

                    <p style="margin: 24px 0 8px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                      ¿El botón no funciona? Copia y pega esta dirección en tu navegador:
                    </p>
                    <p style="margin: 0; word-break: break-all; font-size: 11px; color: #6366f1;">
                      <a href="${resetUrl}" style="color: #6366f1; text-decoration: underline;">${resetUrl}</a>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 32px; background-color: #fafaf9; border-top: 1px solid #f5f5f4; text-align: center;">
                    <p style="margin: 0 0 6px; font-size: 12px; color: #94a3b8;">
                      Si no realizaste esta solicitud, puedes ignorar este mensaje de forma segura. Tu contraseña actual no cambiará.
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #cbd5e1;">
                      VocAcción © 2026 • Plataforma de Orientación Vocacional para Jóvenes
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const textContent = `
Hola, ${userName}.

Recibimos una solicitud para restablecer la contraseña de tu cuenta en VocAcción.
Para crear tu nueva contraseña, visita este enlace seguro (válido por 1 hora):
${resetUrl}

Si no solicitaste este cambio, ignora este mensaje. Tu cuenta permanece protegida.

VocAcción © 2026
    `.trim();

    await transporter.sendMail({
      from,
      to: toEmail,
      subject: 'Restablece tu contraseña - VocAcción',
      text: textContent,
      html: htmlContent
    });

    console.info(`[VocAcción Mailer] Correo de recuperación enviado satisfactoriamente a ${toEmail}`);
    return {
      sent: true,
      configured: true,
      resetUrl
    };
  } catch (err: any) {
    console.error('[VocAcción Mailer Error]', err);
    return {
      sent: false,
      configured: true,
      resetUrl,
      error: err?.message || 'Error al enviar correo por SMTP'
    };
  }
}
