"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Clock1, Home, Menu, Settings, User2 } from "lucide-react";
import Notifications from "@/app/mechanics/_components/notification";
import UserControl from "@/app/mechanics/_components/user-details";
import Link from "next/link";

const navItems = [
  { href: "/mechanics", icon: Home, label: "Dashboard" },
  { href: "/mechanics/appointments", icon: Clock1, label: "Appointments" },
  {
    href: "/mechanics/services",
    icon: Settings,
    label: "Services",
  },
  { href: "/mechanics/notifications", icon: Bell, label: "Notifications" },
  { href: "/mechanics/account", icon: User2, label: "Account" },
];

export default function NavBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex justify-between items-center gap-4 pr-12 md:pr-0">
        Mechanic Admin Side
        <div className="flex gap-4 items-center">
          <Notifications />
          <UserControl />
        </div>
      </div>
    </header>
  );
}
