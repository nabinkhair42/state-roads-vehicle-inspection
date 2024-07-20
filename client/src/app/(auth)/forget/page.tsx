"use client";
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const sendOTP = () => {
        alert("OTP Sent")
        //reerect to verification page
        window.location.href = "/verification"
    }
const page = () => {
    
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
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="admin@gmail.com" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" onClick={sendOTP}>Send OTP</Button>
                    <CardDescription>
                         Remember Password? <Link href="/sign-in" className="underline text-primary">Sign In</Link>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page