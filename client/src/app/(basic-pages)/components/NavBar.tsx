"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
} from "@/components/ui/sheet";
import Logo from "@/assets/logo.png";
import {
  AlignLeft,
  Home,
  MousePointerBan,
  CarFront,
  Store,
  ContactRound,
} from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/hooks/store";
import UserControl from "./user-info";

const NavMenuList = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Services",
    href: "/services",
    icon: MousePointerBan,
  },
  {
    name: "Workshops",
    href: "/workshops",
    icon: CarFront,
  },
  {
    name: "Book Appointment",
    href: "/book-appointment",
    icon: Store,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    icon: ContactRound,
  },
];

export function NavigationMenuDemo() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <NavigationMenu className="h-20 flex justify-between items-center shadow-sm border-b sticky top-0 px-10 xl:px-16 w-screen bg-background">
      <Link href="/" passHref>
        <Image
          src={Logo}
          alt="logo"
          className="w-fit xl:h-16 h-14 object-contain"
        />
      </Link>

      {/* Desktop Menu  */}

      <NavigationMenuList className="hidden md:flex gap-2 xl:gap-8 text-sm text-nowrap ">
        {NavMenuList.map((item, index) => (
          <NavigationMenuItem key={index}>
            <Link
              href={item.href}
              passHref
              className="hover:text-primary transition-colors"
            >
              <NavigationMenuLink>{item.name}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>

      <div className="flex gap-2">
        {/* Buttons */}
        {isAuthenticated ? (
          <UserControl />
        ) : (
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
        )}
        {/* //Mobile Menu  */}
        <div className=" md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button className="flex md:hidden" variant={"outline"}>
                <AlignLeft />
              </Button>
            </SheetTrigger>
            <SheetContent side={"right"}>
              <SheetDescription>
                <ul className="list-none mt-10">
                  {NavMenuList.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-4 hover:text-primary transition-colors"
                    >
                      <Link
                        href={item.href}
                        passHref
                        className="px-4 py-2 text-xl flex gap-4 justify-start items-center mt-4"
                      >
                        <item.icon />
                        <NavigationMenuLink className="no-underline">
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </NavigationMenu>
  );
}

export default NavigationMenuDemo;
