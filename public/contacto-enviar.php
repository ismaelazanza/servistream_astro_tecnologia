<?php
declare(strict_types=1);

const CONTACT_RECIPIENT = 'soporte@servistream.net';
const CONTACT_FROM = 'web@servistream.net';
const CONTACT_RETURN_URL = '/contacto';

function redirectWith(string $parameter): never
{
    header('Location: ' . CONTACT_RETURN_URL . '?' . $parameter, true, 303);
    exit;
}

function cleanLine(string $value, int $maximumLength): string
{
    $value = trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
    return function_exists('mb_substr')
        ? mb_substr($value, 0, $maximumLength, 'UTF-8')
        : substr($value, 0, $maximumLength);
}

function cleanMessage(string $value, int $maximumLength): string
{
    $value = trim(str_replace("\0", '', $value));
    return function_exists('mb_substr')
        ? mb_substr($value, 0, $maximumLength, 'UTF-8')
        : substr($value, 0, $maximumLength);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit;
}

// Los bots suelen completar este campo oculto; para ellos simulamos éxito.
if (trim((string) ($_POST['empresa'] ?? '')) !== '') {
    redirectWith('enviado=1');
}

$name = cleanLine((string) ($_POST['nombre'] ?? ''), 120);
$email = cleanLine((string) ($_POST['email'] ?? ''), 254);
$phone = cleanLine((string) ($_POST['telefono'] ?? ''), 50);
$service = cleanLine((string) ($_POST['servicio'] ?? ''), 100);
$message = cleanMessage((string) ($_POST['mensaje'] ?? ''), 5000);
$consent = (string) ($_POST['consentimiento'] ?? '');

if (
    $name === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $service === '' ||
    $message === '' ||
    $consent !== 'aceptado'
) {
    redirectWith('error=1');
}

$host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
if ($host !== '' && !in_array(preg_replace('/:\d+$/', '', $host), ['servistream.net', 'www.servistream.net'], true)) {
    redirectWith('error=1');
}

$subject = 'Nuevo contacto desde Servistream.net: ' . $service;
$body = implode("\r\n", [
    'Nuevo mensaje recibido desde el formulario de contacto.',
    '',
    'Nombre: ' . $name,
    'Correo: ' . $email,
    'Teléfono: ' . ($phone !== '' ? $phone : 'No indicado'),
    'Servicio: ' . $service,
    'Consentimiento: aceptado',
    '',
    'Mensaje:',
    $message,
    '',
    'IP: ' . cleanLine((string) ($_SERVER['REMOTE_ADDR'] ?? 'No disponible'), 45),
]);

$headers = [
    'From: Servistream Web <' . CONTACT_FROM . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: Servistream Contact Form',
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = mail(CONTACT_RECIPIENT, $encodedSubject, $body, implode("\r\n", $headers));

redirectWith($sent ? 'enviado=1' : 'error=1');
