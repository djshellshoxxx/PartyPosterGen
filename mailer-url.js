/**
 * Never send a mailer bearer credential over a remote cleartext connection.
 * HTTP is permitted only for the local machine during development.
 */
export function validateMailerEndpoint(input) {
  const value = String(input || '').trim();
  let url;
  try { url = new URL(value); }
  catch { throw new Error('Enter a valid mail server URL.'); }
  if (url.username || url.password) throw new Error('Mailer URLs must not contain credentials.');
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Mailer URL must use HTTPS.');
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname.toLowerCase());
  if (url.protocol !== 'https:' && !loopback) {
    throw new Error('HTTPS is required for remote mail servers to protect the access key.');
  }
  if (url.search || url.hash) throw new Error('Mailer URL must not contain query parameters or fragments.');
  return url.href.replace(/\/+$/, '');
}
