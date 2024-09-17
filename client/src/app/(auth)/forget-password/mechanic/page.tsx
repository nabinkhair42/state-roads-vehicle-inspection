"use client";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import {
  userResetPasswordRequest,
  userResetPasswordVerify,
  mechanicResetPasswordRequest,
  mechanicResetPasswordVerify,
} from "@/services/auth";
import { Loader2 } from "lucide-react";

type ResetPasswordMode = "user" | "mechanic";

const ResetPassword = ({ mode }: { mode: ResetPasswordMode }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      if (mode === "user") {
        await userResetPasswordRequest(email);
      } else {
        await mechanicResetPasswordRequest(email);
      }
      setStep("verify");
      toast.success("OTP sent to your email!");
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof Error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unknown error occurred.");
          }
        } else {
          toast.error("An unknown error occurred.");
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      if (mode === "user") {
        await userResetPasswordVerify(email, newPassword, otp);
      } else {
        await mechanicResetPasswordVerify(email, newPassword, otp);
      }
      toast.success("Your password is updated, you can login now!");
      router.push("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forget Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {step === "request" ? (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    mode === "user" ? "user@gmail.com" : "mechanic@gmail.com"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                className="w-full"
                onClick={handleRequestOtp}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="otp">OTP</Label>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(val) => setOtp(val)}
                >
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                className="w-full"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <CardDescription>
            Remember Password?{" "}
            <Link href="/sign-in" className="underline text-primary">
              Sign In
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
