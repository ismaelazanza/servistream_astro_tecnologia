import nodemailer from 'nodemailer';

const recipient = process.env.CONTACT_EMAIL || 'soporte@servistream.net';

function cleanLine(value, maximumLength) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, maximumLength);
}

function cleanMessage(value, maximumLength) {
  return String(value ?? '').replaceAll('\0', '').trim().slice(0, maximumLength);
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false, message: 'Método no permitido.' });
  }

  if (cleanLine(request.body?.website_url_check, 100) !== '') {
    return response.status(422).json({
      ok: false,
      message: 'No fue posible validar el formulario.',
    });
  }

  const name = cleanLine(request.body?.nombre, 120);
  const email = cleanLine(request.body?.email, 254);
  const phone = cleanLine(request.body?.telefono, 50);
  const service = cleanLine(request.body?.servicio, 100);
  const message = cleanMessage(request.body?.mensaje, 5000);
  const consent = cleanLine(request.body?.consentimiento, 20);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !validEmail || !service || !message || consent !== 'aceptado') {
    return response.status(422).json({
      ok: false,
      message: 'Revisa los datos obligatorios del formulario.',
    });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('Contact form SMTP configuration is incomplete.');
    return response.status(503).json({
      ok: false,
      message: 'El servicio de correo no está configurado temporalmente.',
    });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    'Nuevo mensaje recibido desde el formulario de contacto.',
    '',
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Teléfono: ${phone || 'No indicado'}`,
    `Servicio: ${service}`,
    'Consentimiento: aceptado',
    '',
    'Mensaje:',
    message,
  ].join('\n');

  try {
    await transporter.sendMail({
      from: `Servistream Web <${SMTP_USER}>`,
      to: recipient,
      replyTo: { name, address: email },
      subject: `Nuevo contacto desde Servistream.net: ${service}`,
      text,
    });
    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form email failed:', error);
    return response.status(502).json({
      ok: false,
      message: 'No fue posible enviar el mensaje. Inténtalo nuevamente.',
    });
  }
}
