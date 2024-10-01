"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/assets/logo.svg";
import {
  AlignLeft,
  Home,
  MousePointerBan,
  CarFront,
  Store,
  ContactRound,
} from "lucide-react";
import UserControl from "./user-info";
import { cn } from "@/lib/utils";

const NavMenuList = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services", icon: MousePointerBan },
  { name: "Workshops", href: "/workshops", icon: CarFront },
  { name: "Book Appointment", href: "/book-appointment", icon: Store },
  { name: "Contact Us", href: "/contact-us", icon: ContactRound },
];

export default function NavigationMenuDemo() {
  const { isAuthenticated } = useAppSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth);
  const pathname = usePathname();

  return (
    <NavigationMenu className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8 lg:px-16">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={Logo}
            alt="logo"
            className="h-8 w-auto object-contain sm:h-10"
          />
        </Link>

        {/* Desktop Menu */}
        <NavigationMenuList className="hidden lg:flex">
          {NavMenuList.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "mr-4 transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : ""
                  )}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <div className="flex items-center space-x-4">
          {/* Auth Buttons or User Control */}
          {isAuthenticated ? (
            <UserControl />
          ) : (
            <div className="flex space-x-2">
              <Link href="/sign-in" passHref>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" passHref>
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size="icon" className="lg:hidden">
                <AlignLeft className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  {NavMenuList.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-2 rounded-md p-2 transition-colors",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground/60 hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {!isAuthenticated && (
                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Sign In
                  </Button>
                  <Button className="w-full justify-start">Sign Up</Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </NavigationMenu>
  );
}
