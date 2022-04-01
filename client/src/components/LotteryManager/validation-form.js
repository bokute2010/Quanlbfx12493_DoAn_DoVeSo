
export const required = (val) => val && val.length;
export const maxLength = (len) => (val) => val.length <= len;
export const minLength = (len) => (val) => val.length >= len;
export const validNumber = (len) => (val) => !(val) || (val.length === len);
export const isNumber = (val) => !isNaN(Number(val));