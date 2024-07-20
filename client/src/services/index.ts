const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1";

export const API_URL = {
  // auth
  MECHANICS_SIGNUP: BASE_URL + "/mechanics/auth/signup",
  USER_SIGNUP: BASE_URL + "/auth/signup",
  MECHANICS_LOGIN: BASE_URL + "/mechanics/auth/login",
  USER_LOGIN: BASE_URL + "/auth/login",
  MECHANICS_LOGOUT: BASE_URL + "/mechanics/auth/logout",
  USER_LOGOUT: BASE_URL + "/auth/logout",
  MECHANICS_PROFILE: BASE_URL + "/mechanics/auth/me",
  USER_PROFILE: BASE_URL + "/auth/me",
};
