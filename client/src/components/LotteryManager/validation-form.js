
export const required = (val) => val && val.length;
export const maxLength = (len) => (val) => val.length <= len;
export const minLength = (len) => (val) => val.length >= len;
export const validNumber = (len) => (val) => !(val) || (val.length === len) || !(parseInt(val) >= 0);
export const isNumber = (val) => !isNaN(Number(val));
export const isPositive = (val) => !val || (parseInt(val) >= 0);
