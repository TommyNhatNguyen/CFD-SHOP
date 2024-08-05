export const REGEX = {
  isEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  },
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
