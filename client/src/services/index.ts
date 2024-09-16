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
  RESEND_OTP_USER_SIGNUP: BASE_URL + "/auth/signup/resend-otp",
  VERIFY_OTP_USER_SIGNUP: BASE_URL + "/auth/verify",

  //services
  CREATE_SERVICE: BASE_URL + "/services",
  GET_MECHANICS_SERVICES: BASE_URL + "/services/mechanics",
  ALL_SERVICES: BASE_URL + "/services",

  // appointments
  GET_MECHANICS_APPOINTMENTS: BASE_URL + "/appointments/mechanics",
  GET_USER_APPOINTMENTS: BASE_URL + "/appointments/user",
  APPROVE_APPOINTMENT: BASE_URL + "/appointments/status/approve", // :id
  REJECT_APPOINTMENT: BASE_URL + "/appointments/status/reject", // :id
  COMPLETE_APPOINTMENT: BASE_URL + "/appointments/status/complete", // :id
  BOOK_APPOINTMENT: BASE_URL + "/appointments", // :id

  // stats
  GET_MECHANICS_STATS: BASE_URL + "/stats/mechanics",

  // workshops
  GET_ALL_WORKSHOPS: BASE_URL + "/workshops",
};
