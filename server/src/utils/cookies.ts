import { Response } from "express";
import { createToken } from "./token-manager";
import ENV_CONFIG from "@/config/env.config";

/**
 * A utility class for handling cookies.
 */

/**
 * Handles cookies by clearing existing cookies and setting new ones.
 * @param res - The express.js response object.
 * @param userId - The user ID.
 */
export const registerCookies = (
  res: Response,
  userId: string,
  authToken: string
) => {
  // clear cookies
  // clearCookies(res);

  // set cookies
  const token = createToken(userId, "7d");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  res.cookie(authToken, token, {
    path: "/",
    domain: ENV_CONFIG.FRONTEND_DOMAIN,
    expires: expires,
    httpOnly: true,
    signed: true,
    sameSite: "none",
    secure: true,
  });
};

/**
 * Clears the existing cookies.
 * @param res - The response object.
 */
export const clearCookies = (res: Response, authToken: string) => {
  res.clearCookie(authToken, {
    path: "/",
    domain: ENV_CONFIG.FRONTEND_DOMAIN,
    httpOnly: true,
    signed: true,
    sameSite: "none",
    secure: true,
  });
};
