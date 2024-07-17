// password must contain uppercase, lowercase number and special character
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const USERNAME_REGEX = /^[a-z0-9_]{3,}$/;
