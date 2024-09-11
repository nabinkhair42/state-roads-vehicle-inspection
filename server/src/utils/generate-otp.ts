import crypto from "crypto";

// Generate a 6 digit OTP
export const generateOTP = () => {
  const otp = (crypto.randomInt(0, 1000000) + 1000000).toString().substring(1);
  return otp;
};

export const validateOTP = (data: {
  otp: number;
  existingOTP: number;
  expiresAt: Date;
}): {
  isValid: boolean;
  reason?: "EXPIRED" | "MISMATCH";
} => {
  const now = Date.now();
  const expiresAt = data.expiresAt.getTime();

  if (expiresAt < now) {
    return {
      isValid: false,
      reason: "EXPIRED",
    };
  }
  if (data.otp === data.existingOTP) {
    return {
      isValid: true,
    };
  }

  return {
    isValid: false,
    reason: "MISMATCH",
  };
};
