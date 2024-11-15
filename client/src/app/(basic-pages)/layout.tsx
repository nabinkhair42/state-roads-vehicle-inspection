import Navbar from "@/app/(basic-pages)/_components/NavBar";
import Footer from "@/app/(basic-pages)/_components/Footer";
import Announcement from "@/app/(basic-pages)/_components/Announcement";

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
