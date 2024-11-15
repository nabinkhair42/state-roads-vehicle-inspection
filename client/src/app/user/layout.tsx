"use client";
import SideBar from "@/app/user/_components/SideBar";
import NavBar from "@/app/user/_components/NavBar";
import NotFound from "@/components/pages/not-found";
import { useAppSelector } from "@/hooks/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  if (!isAuthenticated || !user) {
    return <NotFound />;
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <NavBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
