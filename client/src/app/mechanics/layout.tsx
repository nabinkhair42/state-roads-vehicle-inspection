"use client";
import SideBar from "@/app/mechanics/_components/sidebar";
import NavBar from "@/app/mechanics/_components/navbar";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import NotFound from "@/components/pages/not-found";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, mechanic } = useAppSelector((state) => state.auth);
  if (!isAuthenticated || !mechanic) return <NotFound />;
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
