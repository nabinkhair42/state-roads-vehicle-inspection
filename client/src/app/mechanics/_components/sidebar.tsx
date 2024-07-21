"use client";
import Link from "next/link";
import { Car, Home, Clock1, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/mechanics", icon: Home, label: "Dashboard" },
  { href: "/mechanics/appointments", icon: Clock1, label: "Appointments" },
  {
    href: "/mechanics/services",
    icon: Settings,
    label: "Services",
  },
];

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Car className="h-6 w-6" />
            <span className="">State Road</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 hover:text-primary transition-all",
                  pathname === href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:bg-muted/10"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
