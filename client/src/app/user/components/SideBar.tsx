import Link from "next/link";
import { Car, Home, Bell, Clock1, User2 } from "lucide-react";

const navItems = [
  { href: "/user", icon: Clock1, label: "My Appointments" },
  { href: "/user/notifications", icon: Bell, label: "Notifications" },
  { href: "/user/account", icon: User2, label: "Account" },
];

export default function SideBar() {
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:text-primary transition-all"
              >
                <Icon className="h-4 w-4" />
                {label}
                {/* {badge && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {badge}
                  </Badge>
                )} */}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
