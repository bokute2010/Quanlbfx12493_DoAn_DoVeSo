
export const required = (val) => val && val.length;
export const maxLength = (len) => (val) => !(val) || (val.length <= len);
export const minLength = (len) => (val) => val && (val.length >= len);
export const validNumber = (len) => (val) => !(val) || (val.length === len) || !(parseInt(val) >= 0);
export const isNumber = (val) => !isNaN(Number(val));
export const isPositive = (val) => !val || (parseInt(val) >= 0);
export const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
export const validUsername = (val) => /^(?=[a-z0-9._]{5,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(val)
