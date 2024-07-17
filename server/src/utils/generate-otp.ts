import crypto from 'crypto';

export const generateOTP = () => {
    const otp = (crypto.randomInt(0, 1000000) + 1000000)
        .toString()
        .substring(1);
    return otp;
}
