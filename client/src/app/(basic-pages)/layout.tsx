import Navbar from "@/app/(basic-pages)/components/NavBar";
import Footer from "@/app/(basic-pages)/components/Footer";
import Announcement from "@/app/(basic-pages)/components/Announcement";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Announcement />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
