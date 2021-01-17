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
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

export const findDiff = (str1, str2) => {
  const diff = [];
  str2.split('').forEach((val, i) => {
    if (val !== str1.charAt(i)) diff.push(val);
    else if (diff[diff.length - 1] === ',');
    else diff.push(',');
  });
  return diff
    .join('')
    .split(',')
    .filter((item) => !!item);
};

export default {};
