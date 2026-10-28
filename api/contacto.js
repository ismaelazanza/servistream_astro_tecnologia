import nodemailer from 'nodemailer';

const recipient = process.env.CONTACT_EMAIL || 'soporte@servistream.net';
const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function cleanLine(value, maximumLength) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, maximumLength);
}

function cleanMessage(value, maximumLength) {
  return String(value ?? '').replaceAll('\0', '').trim().slice(0, maximumLength);
}

async function verifyTurnstile(request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.PUBLIC_TURNSTILE_SITE_KEY;

  // Permite desplegar el código antes de crear el widget. Si una sola clave está
  // presente, bloquea los envíos para evitar una protección incompleta.
  if (!secret && !siteKey) return true;
  if (!secret || !siteKey) return false;

  const token = cleanMessage(request.body?.['cf-turnstile-response'], 2048);
  if (!token) return false;

  const forwardedFor = cleanLine(request.headers?.['x-forwarded-for'], 200);
  const remoteIp = forwardedFor.split(',')[0]?.trim();
  const verification = await fetch(turnstileVerifyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      response: token,
      ...(remoteIp ? { remoteip: remoteIp } : {}),
    }),
  });
  if (!verification.ok) return false;

  const result = await verification.json();
  const validHostname = ['servistream.net', 'www.servistream.net'].includes(result.hostname);
  return result.success === true && result.action === 'contact-form' && validHostname;
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

  try {
    if (!(await verifyTurnstile(request))) {
      return response.status(403).json({
        ok: false,
        message: 'No fue posible verificar que eres una persona.',
      });
    }
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return response.status(503).json({
      ok: false,
      message: 'La verificación de seguridad no está disponible temporalmente.',
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
