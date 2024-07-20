"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Clock1, Menu, Settings } from "lucide-react";
import Notifications from "@/app/mechanics/components/Notification";
import UserControl from "@/app/mechanics/components/UserControl";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

// Define navigation items
const navItems = [
  { href: "/mechanic", icon: Clock1, label: "My Appointments" },
  {
    href: "/mechanic/services",
    icon: Settings,
    label: "My Services",
    badge: 6,
  },
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
            {navItems.map(({ href, icon: Icon, label, badge }) => (
              <Link
                key={label}
                href={href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
              >
                <Icon className="h-5 w-5" />
                {label}
                {badge && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex justify-between items-center gap-4 pr-12 md:pr-0">
        Mechanic Admin Side
        <div className="flex gap-4">
          <Notifications />
          <UserControl />
        </div>
      </div>
    </header>
  );
}
