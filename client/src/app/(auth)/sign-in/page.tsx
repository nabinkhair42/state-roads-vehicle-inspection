import React from 'react'
import { cn } from '@/lib/utils'
import Link from "next/link";
import DotPattern from "@/components/ui/dotPattern";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Key } from 'lucide-react';

const page = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
      <div className='bg-white z-10'>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">User</TabsTrigger>
            <TabsTrigger value="password">Mechanic</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>User Login</CardTitle>
                <CardDescription>
                  Use credentials to sign is to dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" placeholder="example@gmail.com" type='email' required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input id="username" placeholder="Enter your Password" type='password' required />
                </div>
              </CardContent>
              <CardFooter className='w-full flex flex-col gap-2 justify-center items-center'>
                <Button className='flex gap-4 px-8'><Key />Login</Button>
                <Link className='text-primary text-sm' href="/forget">Forget Password?</Link>
                <p className='flex gap-2 justify-center items-center text-sm'>Don't have account?<Link className='text-primary text-sm' href="/sign-up">Sign Up</Link></p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Mechanic Login</CardTitle>
                <CardDescription>
                  Use credentials to sign is to dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" placeholder="example@gmail.com" type='email' required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input id="username" placeholder="Enter your Password" type='password' required />
                </div>
              </CardContent>
              <CardFooter className='w-full flex flex-col gap-2 justify-center items-center'>
                <Button className='flex gap-4 px-8'><Key />Login</Button>
                <Link className='text-primary text-sm' href="/forget">Forget Password?</Link>
                <p className='flex gap-2 justify-center items-center text-sm'>Don't have account?<Link className='text-primary text-sm' href="/sign-up">Sign Up</Link></p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div >
    </div >
  )
}

export default page