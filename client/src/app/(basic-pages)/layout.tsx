import Navbar from "@/app/(basic-pages)/components/NavBar";
import Footer from "@/app/(basic-pages)/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
