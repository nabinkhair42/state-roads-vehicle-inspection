"use client"
import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { AlignLeft, Home, MousePointerBan, CarFront, Store, ContactRound } from "lucide-react";

const NavMenuList = [
    {
        name: "Home",
        href: "/",
        icon: Home,
    },
    {
        name: "Book Appointment",
        href: "/book-appointment",
        icon: MousePointerBan,
    },
    {
        name: "Workshops",
        href: "/workshops",
        icon: CarFront,
    },
    {
        name: "About Us",
        href: "/about-us",
        icon: Store,
    },
    {
        name: "Contact Us",
        href: "/contact-us",
        icon: ContactRound,
    }
]

export function NavigationMenuDemo() {
    return (
        <NavigationMenu className="h-20 flex justify-between items-center shadow-sm border-b sticky top-0 px-10 xl:px-16 w-screen">
            <div className=" md:hidden ">
                <Sheet>
                    <SheetTrigger>
                        <Button className="flex md:hidden" variant={"outline"}>
                            <AlignLeft />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetDescription>

                            <ul className="list-none p-0 m-0">
                                {NavMenuList.map((item, index) => (
                                    <li key={index} className="flex gap-4">
                                        <Link href={item.href} passHref className="px-4 py-2 text-xl flex gap-4 justify-start items-center mt-4"><item.icon />
                                            <NavigationMenuLink className="no-underline">{item.name}</NavigationMenuLink>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </SheetDescription>
                    </SheetContent>
                </Sheet>
            </div>
            <NavigationMenuList className="hidden md:flex gap-8">
                {NavMenuList.map((item, index) => (
                    <NavigationMenuItem key={index} >

                        <Link href={item.href} passHref>

                            <NavigationMenuLink>{item.name}</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
            <NavigationMenuList className="flex gap-4">
                <NavigationMenuItem>
                    <Link href="/sign-in" legacyBehavior passHref>
                        <Button variant={"outline"}>Sign In</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/sign-up" legacyBehavior passHref>
                        <Button>Sign Up</Button>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavigationMenuDemo
