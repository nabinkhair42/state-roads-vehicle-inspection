"use client";
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link"

const resendOTP = () => {
    alert("Resend Sent")
}
const verified = () => {
    alert("Verified")
    //reerect to verification page
    window.location.href = "/dashboard"
}
const page = () => {
    return (
        <div className="w-screen h-screen flex justify-center place-items-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Verification</CardTitle>
                    <CardDescription>
                        Enter the OTP sent to your email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <InputOTP maxLength={6}>
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
                    <Button className="w-full" onClick={verified}>Verify</Button>
                    <CardDescription>OTP not found?<Link href="/" className="underline text-primary" onClick={resendOTP}>Resend OTP</Link></CardDescription>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page