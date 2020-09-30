export const isEmpty = (object) => {
  if (!object) return true;

  return Object.keys(object).length === 0 && object.constructor === Object;
};

export default {};
