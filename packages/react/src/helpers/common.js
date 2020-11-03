import crypto from 'crypto';

export const isEmpty = (object) => {
  if (!object) return true;

  return Object.keys(object).length === 0 && object.constructor === Object;
};

export const post = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => response.text());

export const generateUUID = () => crypto.randomBytes(16).toString('hex');

export const sha256hash = async (message) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return hash;
};

export default {};
