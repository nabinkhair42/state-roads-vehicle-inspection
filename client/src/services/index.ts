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
  UPDATE_USER_PASSWORD: BASE_URL + "/auth/update-password",
  UPDATE_MECHANIC_PASSWORD: BASE_URL + "/mechanics/auth/update-password",
  // Password Reset for Users
  USER_RESET_PASSWORD_REQUEST: BASE_URL + "/auth/reset-password",
  USER_RESET_PASSWORD_VERIFY: BASE_URL + "/auth/reset-password/verify",

  // Password Reset for Mechanics
  MECHANIC_RESET_PASSWORD_REQUEST: BASE_URL + "/mechanics/auth/reset-password",
  MECHANIC_RESET_PASSWORD_VERIFY:
    BASE_URL + "/mechanics/auth/reset-password/verify",

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
  RESEND_OTP_MECHANICS_SIGNUP: BASE_URL + "/mechanics/auth/signup/resend-otp",
  VERIFY_OTP_MECHANICS_SIGNUP: BASE_URL + "/mechanics/auth/verify",

  // stats
  GET_MECHANICS_STATS: BASE_URL + "/stats/mechanics",

  // workshops
  GET_ALL_WORKSHOPS: BASE_URL + "/workshops",

  // notifications
  GET_USER_NOTIFICATIONS: BASE_URL + "/notifications/user",
  GET_MECHANIC_NOTIFICATIONS: BASE_URL + "/notifications/mechanic",
  VIEW_NOTIFICATIONS: BASE_URL + "/notifications/view",
  HIDE_USER_NOTIFICATIONS: BASE_URL + "/notifications/user/hide",
  HIDE_MECHANIC_NOTIFICATIONS: BASE_URL + "/notifications/mechanic/hide",

  // contact
  CONTACT: BASE_URL + "/contact",

  // ADMIN
  GET_DASHBOARD_STATS: "http://localhost:5000/api/v1" + "/admin/stats",
  GET_MECHANICS_LISTS: "http://localhost:5000/api/v1" + "/admin/mechanics",
};



export const adminLoginToken = process.env.NEXT_PUBLIC_ADMIN_LOGIN_TOKEN;