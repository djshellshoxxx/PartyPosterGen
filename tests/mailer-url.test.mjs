import test from 'node:test';
import assert from 'node:assert/strict';
import { validateMailerEndpoint } from '../mailer-url.js';

test('accepts HTTPS and normalizes trailing slashes', () => {
  assert.equal(validateMailerEndpoint('https://mailer.example.com///'), 'https://mailer.example.com');
});
test('blocks plain HTTP to remote servers, preventing token disclosure', () => {
  assert.throws(() => validateMailerEndpoint('http://mailer.example.com'), /HTTPS/);
  assert.throws(() => validateMailerEndpoint('http://192.168.1.5:8787'), /HTTPS/);
});
test('allows HTTP for loopback-only local development', () => {
  assert.equal(validateMailerEndpoint('http://localhost:8787/'), 'http://localhost:8787');
  assert.equal(validateMailerEndpoint('http://127.0.0.1:8787'), 'http://127.0.0.1:8787');
  assert.equal(validateMailerEndpoint('http://[::1]:8787'), 'http://[::1]:8787');
});
test('rejects credentials, dangerous protocols and invalid URLs', () => {
  for (const url of ['javascript:alert(1)', 'file:///etc/passwd', 'https://user:pass@example.com','not-a-url','http://localhost.example.com']) {
    assert.throws(() => validateMailerEndpoint(url));
  }
});
