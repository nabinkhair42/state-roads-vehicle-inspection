"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendOTPForUserSignup,
  useVerifyOTPForUserSignup,
} from "@/services/auth";
import { useState } from "react";

const Page = () => {
  const resendOTP = useResendOTPForUserSignup();
  const verifyOTP = useVerifyOTPForUserSignup();

  const [otp, setOtp] = useState("");
  return (
    <div className="w-screen h-screen flex justify-center place-items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Account Verification</CardTitle>
          <CardDescription>Enter the OTP sent to your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP maxLength={6} value={otp} onChange={(e) => setOtp(e)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => {
              verifyOTP.mutate(Number(otp));
            }}
            disabled={verifyOTP.isPending}
          >
            {verifyOTP.isPending ? "Verifying..." : "Verify"}
          </Button>
          <CardDescription>
            Did&apos;t receive the OTP?{" "}
            <button
              className="underline text-primary"
              onClick={() => {
                resendOTP.mutate();
              }}
              disabled={resendOTP.isPending}
            >
              {resendOTP.isPending ? "Sending..." : "Resend OTP"}
            </button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
