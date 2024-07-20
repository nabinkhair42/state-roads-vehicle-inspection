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
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
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
                <CardTitle>Create User Account</CardTitle>
                <CardDescription>
                  Create account from here if you are here to buy car.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input type='text' placeholder='John Doe' required></Input>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" placeholder="example@gmail.com" type='email' required />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor="name">Contact Number</Label>
                  <Input placeholder="+697451514" type='tel' required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input id="username" placeholder="Enter your Password" type='password' required />
                </div>
              </CardContent>
              <CardFooter className='w-full flex flex-col gap-2 justify-center items-center'>
                <Button className='flex gap-4 px-8'>Sign Up</Button>
                <p className='flex gap-2 justify-center items-center text-sm'>Already have account?<Link className='text-primary text-sm' href="/sign-in">Sign In</Link></p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Create Mechanic Account</CardTitle>
                <CardDescription>
                  Create account from here if you are mechanic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex flex-col gap-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input type='text' placeholder='John Doe' required></Input>
                </div>
                <div className='space-y-1'>
                  <Label htmlFor="name">Email</Label>
                  <Input placeholder="example@gmail.com" type='email' required />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor="name">Contact Number</Label>
                  <Input placeholder="+697451514" type='tel' required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Store Name</Label>
                  <Input type='text' placeholder='XYZ Store' required></Input>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Store Address</Label>
                  <Input type='text' placeholder='Address of your store' required></Input>
                </div>
                <Label htmlFor="name">Enter your Location Coordinates</Label>
                <div className="space-y-1 flex gap-2 justify-center items-center">
                  <Input type='text' placeholder='Longitude' required></Input>
                  <Input type='text' placeholder='Latitude' required></Input>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input id="username" placeholder="Enter your Password" type='password' required />
                </div>
              </CardContent>
              <CardFooter className='w-full flex flex-col gap-2 justify-center items-center'>
                <Button className='flex gap-4 px-8'>Sign Up</Button>
                <p className='flex gap-2 justify-center items-center text-sm'>Already have account?<Link className='text-primary text-sm' href="/sign-in">Sign In</Link></p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div >
    </div >
  )
}

export default page