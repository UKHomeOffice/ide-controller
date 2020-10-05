export const isEmpty = (object) => {
  if (!object) return true;

  return Object.keys(object).length === 0 && object.constructor === Object;
};

export const post = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.text());

export default {};
