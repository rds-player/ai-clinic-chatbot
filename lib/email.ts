import { Resend } from 'resend';
import { Lead } from '@/models/Lead';

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY not found. Email notifications will be disabled.');
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendLeadNotificationParams {
  lead: Lead;
}

export async function sendLeadNotification({ lead }: SendLeadNotificationParams) {
  if (!resend) {
    console.log('Email service not configured. Skipping notification.');
    return { success: false, message: 'Email service not configured' };
  }

  const subject = lead.language === 'pt'
    ? `Nova marcação: ${lead.name} - ${lead.service}`
    : `New Appointment: ${lead.name} - ${lead.service}`;

  const html = lead.language === 'pt' ? `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #00a0a0;">Nova Marcação de Consulta</h2>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Nome:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
            <p><strong>Telefone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
            <p><strong>Serviço:</strong> ${lead.service}</p>
            ${lead.preferredDate ? `<p><strong>Data Preferencial:</strong> ${lead.preferredDate}</p>` : ''}
            ${lead.message ? `<p><strong>Mensagem:</strong> ${lead.message}</p>` : ''}
            <p><strong>Status:</strong> ${lead.status}</p>
            <p><strong>Data de Criação:</strong> ${new Date(lead.createdAt).toLocaleString('pt-PT')}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Este email foi enviado automaticamente pelo sistema de chatbot da HealthCare Clinic.
          </p>
        </div>
      </body>
    </html>
  ` : `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #00a0a0;">New Appointment Booking</h2>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
            <p><strong>Service:</strong> ${lead.service}</p>
            ${lead.preferredDate ? `<p><strong>Preferred Date:</strong> ${lead.preferredDate}</p>` : ''}
            ${lead.message ? `<p><strong>Message:</strong> ${lead.message}</p>` : ''}
            <p><strong>Status:</strong> ${lead.status}</p>
            <p><strong>Created:</strong> ${new Date(lead.createdAt).toLocaleString('en-US')}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This email was sent automatically by HealthCare Clinic's chatbot system.
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'HealthCare Clinic <onboarding@resend.dev>',
      to: [process.env.CLINIC_EMAIL || 'clinic@example.com'],
      subject,
      html,
    });

    if (error) {
      console.error('Failed to send email (lead notification):', error);
      return { success: false, error };
    }

    console.log('Email sent successfully to clinic inbox, messageId:', data?.id);
    return { success: true, data };
  } catch (err) {
    console.error('Failed to send email:', err);
    return { success: false, error: err };
  }
}

export async function sendPatientConfirmation(lead: Lead) {
  if (!lead.email) {
    console.warn('Lead email not provided. Skipping patient confirmation.');
    return { success: false, message: 'Lead email missing' };
  }

  if (!resend) {
    console.log('Email service not configured. Skipping confirmation.');
    return { success: false, message: 'Email service not configured' };
  }

  const subject = lead.language === 'pt'
    ? '✅ Consulta Agendada - HealthCare Clinic'
    : '✅ Appointment Scheduled - HealthCare Clinic';

  const html = lead.language === 'pt' ? `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="background-color: #00a0a0; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">✅ Consulta Agendada!</h2>
          </div>
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px;">Olá <strong>${lead.name}</strong>,</p>
            <p>Temos o prazer de confirmar que a sua consulta foi agendada com sucesso!</p>

            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00a0a0;">
              <h3 style="margin-top: 0; color: #00a0a0;">Detalhes da Consulta:</h3>
              <p style="margin: 10px 0;"><strong>Serviço:</strong> ${lead.service}</p>
              ${lead.preferredDate ? `<p style="margin: 10px 0;"><strong>Data:</strong> ${lead.preferredDate}</p>` : ''}
              <p style="margin: 10px 0;"><strong>Estado:</strong> <span style="color: #16a34a; font-weight: bold;">Agendada</span></p>
            </div>

            <p>Aguardamos ansiosamente pela sua visita. Se precisar de reagendar ou tiver alguma questão, não hesite em contactar-nos.</p>

            <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #00a0a0;">Precisa de Ajuda?</p>
              <p style="margin: 5px 0;"><strong>Telefone:</strong> <a href="tel:+351912345678" style="color: #00a0a0; text-decoration: none;">+351 912 345 678</a></p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:contact@healthcareclinic.pt" style="color: #00a0a0; text-decoration: none;">contact@healthcareclinic.pt</a></p>
            </div>
          </div>
          <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            HealthCare Clinic - Cuidar da sua saúde é a nossa prioridade
          </p>
        </div>
      </body>
    </html>
  ` : `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="background-color: #00a0a0; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">✅ Appointment Scheduled!</h2>
          </div>
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px;">Hello <strong>${lead.name}</strong>,</p>
            <p>We're pleased to confirm that your appointment has been successfully scheduled!</p>

            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00a0a0;">
              <h3 style="margin-top: 0; color: #00a0a0;">Appointment Details:</h3>
              <p style="margin: 10px 0;"><strong>Service:</strong> ${lead.service}</p>
              ${lead.preferredDate ? `<p style="margin: 10px 0;"><strong>Date:</strong> ${lead.preferredDate}</p>` : ''}
              <p style="margin: 10px 0;"><strong>Status:</strong> <span style="color: #16a34a; font-weight: bold;">Scheduled</span></p>
            </div>

            <p>We look forward to seeing you. If you need to reschedule or have any questions, please don't hesitate to contact us.</p>

            <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #00a0a0;">Need Help?</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:+351912345678" style="color: #00a0a0; text-decoration: none;">+351 912 345 678</a></p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:contact@healthcareclinic.pt" style="color: #00a0a0; text-decoration: none;">contact@healthcareclinic.pt</a></p>
            </div>
          </div>
          <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            HealthCare Clinic - Your health is our priority
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'HealthCare Clinic <onboarding@resend.dev>',
      to: [lead.email, process.env.CLINIC_EMAIL || 'clinic@example.com'], // Send to patient + clinic backup
      subject,
      html,
      replyTo: process.env.CLINIC_EMAIL || 'clinic@example.com', // Replies go to clinic
    });

    if (error) {
      console.error('Failed to send patient confirmation (API error):', error);
      return { success: false, error };
    }

    console.log(
      'Patient confirmation email sent to:',
      lead.email,
      '+ clinic backup',
      'messageId:',
      data?.id
    );
    return { success: true, data };
  } catch (err) {
    console.error('Failed to send patient confirmation:', err);
    return { success: false, error: err };
  }
}

export async function sendBookingAcknowledgement(lead: Lead) {
  if (!lead.email) {
    console.warn('Lead email not provided. Skipping booking acknowledgement.');
    return { success: false, message: 'Lead email missing' };
  }

  if (!resend) {
    console.log('Email service not configured. Skipping booking acknowledgement.');
    return { success: false, message: 'Email service not configured' };
  }

  const subject = lead.language === 'pt'
    ? '📝 Pedido de Consulta Recebido - HealthCare Clinic'
    : '📝 Appointment Request Received - HealthCare Clinic';

  const html = lead.language === 'pt' ? `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="background-color: #00a0a0; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">📝 Pedido Recebido</h2>
          </div>
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px;">Olá <strong>${lead.name}</strong>,</p>
            <p>Obrigado por solicitar uma consulta connosco! Recebemos o seu pedido e entraremos em contacto em breve para confirmar os detalhes.</p>
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00a0a0;">
              <h3 style="margin-top: 0; color: #00a0a0;">Resumo da Solicitação:</h3>
              <p style="margin: 10px 0;"><strong>Serviço:</strong> ${lead.service}</p>
              ${lead.preferredDate ? `<p style="margin: 10px 0;"><strong>Data Preferencial:</strong> ${lead.preferredDate}</p>` : ''}
              <p style="margin: 10px 0;"><strong>Status:</strong> <span style="color: #f59e0b; font-weight: bold;">Aguarda confirmação</span></p>
            </div>
            <p>Se tiver alguma dúvida ou precisar de alterar alguma informação, responda a este email ou contacte-nos diretamente.</p>
            <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #00a0a0;">Precisa de Ajuda?</p>
              <p style="margin: 5px 0;"><strong>Telefone:</strong> <a href="tel:+351912345678" style="color: #00a0a0; text-decoration: none;">+351 912 345 678</a></p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:contact@healthcareclinic.pt" style="color: #00a0a0; text-decoration: none;">contact@healthcareclinic.pt</a></p>
            </div>
          </div>
          <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            HealthCare Clinic - Cuidar da sua saúde é a nossa prioridade
          </p>
        </div>
      </body>
    </html>
  ` : `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="background-color: #00a0a0; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">📝 Request Received</h2>
          </div>
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px;">Hi <strong>${lead.name}</strong>,</p>
            <p>Thanks for requesting an appointment! We received your request and will reach out shortly to confirm the details.</p>
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00a0a0;">
              <h3 style="margin-top: 0; color: #00a0a0;">Request Summary:</h3>
              <p style="margin: 10px 0;"><strong>Service:</strong> ${lead.service}</p>
              ${lead.preferredDate ? `<p style="margin: 10px 0;"><strong>Preferred Date:</strong> ${lead.preferredDate}</p>` : ''}
              <p style="margin: 10px 0;"><strong>Status:</strong> <span style="color: #f59e0b; font-weight: bold;">Awaiting confirmation</span></p>
            </div>
            <p>If you have any questions or need to update your info, just reply to this email or reach out to us directly.</p>
            <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #00a0a0;">Need Help?</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:+351912345678" style="color: #00a0a0; text-decoration: none;">+351 912 345 678</a></p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:contact@healthcareclinic.pt" style="color: #00a0a0; text-decoration: none;">contact@healthcareclinic.pt</a></p>
            </div>
          </div>
          <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            HealthCare Clinic - Your health is our priority
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'HealthCare Clinic <onboarding@resend.dev>',
      to: [lead.email, process.env.CLINIC_EMAIL || 'clinic@example.com'], // Send to patient + clinic backup
      subject,
      html,
      replyTo: process.env.CLINIC_EMAIL || 'clinic@example.com', // Replies go to clinic
    });

    if (error) {
      console.error('Failed to send booking acknowledgement (API error):', error);
      return { success: false, error };
    }

    console.log(
      'Booking acknowledgement sent to:',
      lead.email,
      '+ clinic backup',
      'messageId:',
      data?.id
    );
    return { success: true, data };
  } catch (err) {
    console.error('Failed to send booking acknowledgement:', err);
    return { success: false, error: err };
  }
}
